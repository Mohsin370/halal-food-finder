import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 dark:bg-gray-800 dark:text-white mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">HalalHunt</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Find the best halal food options near you. Your trusted guide for halal restaurants.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link color="primary" href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link color="primary" href="/restaurants" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Restaurants
              </Link>
            </li>
            <li>
              <Link color="primary" href="/about" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link color="primary" href="/contact" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link isExternal href="https://facebook.com" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link isExternal href="https://twitter.com" className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link isExternal href="https://instagram.com" className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600 dark:border-gray-700 dark:text-gray-400">
        &copy; 2024 HalalFindr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
