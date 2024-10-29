const Footer = () => {
  return (
    <footer className="mt-16 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-primary">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold">
                Foot<span className="text-primary">Flair</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Step into style, walk in comfort.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FootFlair. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
