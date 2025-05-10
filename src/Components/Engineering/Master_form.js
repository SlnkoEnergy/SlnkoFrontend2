import React, { useState } from 'react';
import { Box, Stack, Select, Option, Input, FormControl, FormLabel, Typography, Sheet } from '@mui/joy';

const categories = [
  'Module', 'Inverter', 'AC Cable', 'DC Cable',
  'HT Panel', 'LT Panel', 'BOS', 'Pooling Station'
];

function DynamicBOMForm() {
  const [category, setCategory] = useState('');

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 'md',
          p: 4,
          boxShadow: 'lg',
          bgcolor: 'background.body',
        }}
      >
        <Typography level="h4" textAlign="center" mb={2}>
          Bill of Materials Form
        </Typography>

        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select onChange={(e, val) => setCategory(val)} placeholder="Select Category">
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </FormControl>

          {/* Conditional Fields */}
          {category === 'Module' && (
            <>
              <Input placeholder="Make" />
              <Input placeholder="Make" />
              <Input placeholder="Rating" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {category === 'Inverter' && (
            <>
              <Input placeholder="Make" />
              <Input placeholder="Capacity" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {(category === 'AC Cable' || category === 'DC Cable') && (
            <>
              <Input placeholder="Size" />
              <Input placeholder="Length" type="number" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {(category === 'HT Panel' || category === 'LT Panel') && (
            <>
              <Input placeholder="Make" />
              <Input placeholder="Rating" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {category === 'BOS' && (
            <>
              <Input placeholder="Description" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {category === 'Pooling Station' && (
            <>
              <Input placeholder="Station Type" />
              <Input placeholder="Capacity" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}

          {!categories.includes(category) && category !== '' && (
            <>
              <Input placeholder="Field 1" />
              <Input placeholder="Field 2" />
              <Input placeholder="Quantity" type="number" />
            </>
          )}
        </Stack>
      </Sheet>
    </Box>
  );
}

export default DynamicBOMForm;
