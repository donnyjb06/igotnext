import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel } from './ui/form';
import { Position } from '@/types/Position';

interface PositionSelectProps<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  label: string,
  values: SelectValueProps<T>[]
  placeholder: string,
}

const PositionSelect = ( {control, name, label, placeholder, values}: PositionSelectProps<T> ) => {
  return (
    <Controller name={name} control={control} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent side='top' avoidCollisions={false}>
            {values.map( value => (
              <SelectItem key={value.value} value={value.value}>{value.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        </FormItem>
    )}/>
  )
}

export default PositionSelect