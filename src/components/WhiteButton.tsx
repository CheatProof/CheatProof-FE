const WhiteButton = ({
  disabled,
  text,
  width,
  py,
  textSize,
  children,
  onClick
}: {
  
  text: string;
  width: string;
  py: string;
  textSize: string;
  children?: React.ReactNode;
  onClick?: () => void; 
  disabled : boolean// Optional onClick handler for the button, if not provided, it will be a simple link to the provided link.  // TODO: Add more props as needed for more complex button functionalities.  // TODO: Ensure the component is accessible by adding ARIA attributes.  // TODO: Implement proper button loading state and accessibility features.  // TODO: Test the component in different screen sizes and browser environments.  // TODO: Optimize the component for performance.
}) => {
  return (
    <button
     onClick={onClick}  // If onClick prop is provided, it will be called when the button is clicked.  // Otherwise, it will be a simple link to the provided link.  // TODO: Add more props as needed for more complex button functionalities.  // TODO: Ensure the component is accessible by adding ARIA attributes.  // TODO: Implement proper button loading state and accessibility features.  // TODO: Test the component in different screen sizes and browser environments.  // TODO
     disabled={disabled}
      className={`dark:bg-whiteSecondary bg-blackPrimary w-${width} py-${py} text-${textSize} dark:hover:bg-white hover:bg-gray-800 bg-blackPrimary duration-200 flex items-center justify-center gap-x-2`}
    >
      {children}
      <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
        {text}
      </span>
    </button>
  );
};
export default WhiteButton;
