export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '40px',                         // h-10
    width: '100%',                          // w-full
    marginTop: '0.5rem',                    // mt-2
    padding: '0 8px',                      // px-4
    fontSize: '14px',                       // text-[16px]
    fontWeight: 600,                        // font-semibold
    borderRadius: '4px',               // rounded
    borderColor: state.isFocused 
      ? '#22c55e'                           // focus:border-green-500
      : '#9ca3af',                          // border-gray-400
    outline: 'none',                        // outline-none
    boxShadow: state.isFocused 
      ? '0 0 0 1px oklch(72.3% 0.219 149.579)'               // focus:ring-2 focus:ring-green-500
      : 'none',
       borderLeft: '2px solid #22c55e',
    '&:hover': {
      borderColor: '#22c55e',               // hover:border-green-500
      cursor: 'text',  
 
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',                       // 👈 placeholder text color (gray-400)
    fontWeight: 500,                       // optional, a bit bolder
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#22c55e'                           // green when selected
      : state.isFocused
      ? '#bbf7d0'                           // light green on hover
      : 'white',
    color: 'black',
    padding: '10px 12px',
    cursor: 'pointer',
  }),
};
