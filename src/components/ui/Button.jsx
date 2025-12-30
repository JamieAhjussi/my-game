export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md cursor-pointer";

  const variants = {
    primary:
      "bg-brand-orange text-white hover:bg-orange-400 hover:shadow-orange-200",
    secondary: "bg-brown-200 text-brown-600 hover:bg-brown-300",
    outline:
      "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
