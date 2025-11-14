# That cool table

A very cool [TanStack table](https://tanstack.com/table/latest) component for [React](https://react.dev/)

- TypeScript pre-typed table
- column sorting function
- discrete yet ultimately cool TalwindCSS styling

## Requirements

That cool table requires [Node.js](https://nodejs.org/en) v.24.11.1.
That cool table can be used within any code editor and was created with [Visual Studio Code](https://code.visualstudio.com/)

## Setup

### How to install That cool table

1. Install package

```bash
npm i @aliasmerry/table
```

2. Install [TalwindCSS](https://tailwindcss.com/)

Add component source to your css file

```css
@source '../node_modules/@aliasmerry/table/**/*.tsx';
```

You may need to adapt node_modules path from previous code depending on your project structure

3. Import component

```js
import { Table } from "@aliasmerry/table";
```

### How to use That cool table

That cool table will receive two props :

- data
  as an array of objects

- columns
  as an array of object :

```js
{
  id: "a string defining column's id",
  accessorKey: "a string matching a key from key/value properties of data's object",
  header: () => "a string defining column's displayed label",
}
```

Table and columns are pre-typed with following types :

```ts
type Column<D> = ColumnDef<D> & { accessorKey: keyof D };
type TableProps<D = { [key: string]: any }> = {
  columns: Column<D>[];
  data: D[];
};
```

Allowing you to use That cool table with an array of objects :

```js
const coolData = [{name : "Granit fountains", rating: "8", notes: "utterly cool"}, {name : "kaleidoscopes", rating: "6", notes: "very cool"}, {name : "LED sneakers", rating: "10", notes: "nothing can be cooler than this"},]

<Table
  data={coolData}
  columns={[
    {
      id: "name",
      accessorKey:
        "name",
      header: () => "Cool stuff",
    },
    {
      id: "rating",
      accessorKey:
        "rating",
      header: () => "Unofficial rating",
    },
    {
      id: "notes",
      accessorKey:
        "notes",
      header: () => "Some thoughts",
    },
  ]}
/>
```
