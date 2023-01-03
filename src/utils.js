export const capitalizeFirstLetter = (word) => {
    if (word)
        return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  };
export const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

export const WS_API_PATH = 'ws://localhost:8000/';
export const HTTP_API_PATH='http://localhost:8000';

export const blog_type = [
  { label: "General", value: "general" },
  { label: "Neurological", value: "neurological" },
  { label: "Urogenital", value: "urogenital" },
  { label: "Oral", value: "oral" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Psychiatry", value: "psychiatry" },
  { label: "Surgery", value: "surgery" },
  { label: "Urology", value: "urology" },
  { label: "Ophthalmology", value: "ophthalmology" },
  { label: "Allergy & Immunology", value: "allergy and immunology" },
  { label: "Pathology", value: "pathology" },
  { label: "Peditrics", value: "peditrics" },
  { label: "Cardiology", value: "cardiology" },


];