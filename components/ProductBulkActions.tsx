'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { importProductsFromCSV, exportProductsToCSV } from '@/app/admin/actions'

export function ProductBulkActions() {
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        title: 'No File Selected',
        description: 'Please select a CSV file to import.',
        variant: 'destructive',
      })
      return
    }

    setIsImporting(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      await importProductsFromCSV(formData)
      toast({
        title: 'Import Successful',
        description: 'Products have been imported from the CSV file. IDs were automatically generated.',
      })
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setSelectedFile(null)
    } catch (error) {
      console.error('Import failed:', error)
      toast({
        title: 'Import Failed',
        description: 'There was an error importing the products. Please check the CSV format and try again.',
        variant: 'destructive',
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const csvContent = await exportProductsToCSV()
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', 'products_export.csv')
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      toast({
        title: 'Export Successful',
        description: 'Products have been exported to a CSV file.',
      })
    } catch (error) {
      console.error('Export failed:', error)
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting the products. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          ref={fileInputRef}
          className="max-w-xs"
        />
        <Button onClick={handleImport} disabled={isImporting || !selectedFile}>
          {isImporting ? 'Importing...' : 'Import Products'}
        </Button>
      </div>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Export Products'}
      </Button>
    </div>
  )
}