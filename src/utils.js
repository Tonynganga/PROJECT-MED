export const capitalizeFirstLetter = (word) => {
    if (word)
        return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  };
export const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];