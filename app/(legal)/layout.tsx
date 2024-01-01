import Image from "next/image";

const LegalLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-8 lg:py-12">
      <div className="relative w-full bg-white px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pb-28 lg:pt-16">
        <div className="prose">
            {children}
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
