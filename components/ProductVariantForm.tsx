import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Attribute {
  key: string;
  value: string;
}

interface ProductVariantFormProps {
  onSubmit: (variant: {
    name: string;
    price: number;
    stock_quantity: number;
    attributes: Record<string, string>;
  }) => void;
}

export function ProductVariantForm({ onSubmit }: ProductVariantFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [attributes, setAttributes] = useState<Attribute[]>([{ key: '', value: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      price: parseFloat(price),
      stock_quantity: parseInt(stockQuantity),
      attributes: Object.fromEntries(attributes.map(attr => [attr.key, attr.value]))
    })
  }

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }])
  }

  const updateAttribute = (index: number, key: string, value: string) => {
    const newAttributes = [...attributes]
    newAttributes[index] = { ...newAttributes[index], [key]: value }
    setAttributes(newAttributes)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Variant Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="stockQuantity">Stock Quantity</Label>
        <Input
          id="stockQuantity"
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />
      </div>
      {attributes.map((attr, index) => (
        <div key={index} className="flex space-x-2">
          <Input
            placeholder="Attribute key"
            value={attr.key}
            onChange={(e) => updateAttribute(index, 'key', e.target.value)}
          />
          <Input
            placeholder="Attribute value"
            value={attr.value}
            onChange={(e) => updateAttribute(index, 'value', e.target.value)}
          />
        </div>
      ))}
      <Button type="button" onClick={addAttribute}>Add Attribute</Button>
      <Button type="submit">Add Variant</Button>
    </form>
  )
}