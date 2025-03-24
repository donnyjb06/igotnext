import React from 'react'
import { FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { Input } from './ui/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  label: string;
  placeholder?: string
  type?: "text" | "email" | "password"| "file"
}

const FormField = ( { control, name, label, placeholder, type="text" }: FormFieldProps<T> ) => {
  return(
    <Controller name={name} control={control} render={({ field, fieldState }) => (
      <FormItem className='mb-0'>
      <FormLabel className='label'>{label}</FormLabel>
      <FormControl>
        <Input className="custom-input" 
          placeholder={placeholder} 
          {...field} 
          type={type}/>
      </FormControl>
      {fieldState.error ? (
        <p className='body-text text-red-500 max-w-[250px]'>{fieldState.error.message}</p>
    </FormItem>
    )}/>
  )
}

export default FormField;