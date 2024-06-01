const Footer = () => {
  return (
    <div className="bg-white py-5">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-black font-bold tracking-tight">
          AFrame.com
        </span>
        <span className="text-black font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
