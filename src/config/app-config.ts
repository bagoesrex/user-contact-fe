import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
    name: "User Contact Management",
    version: packageJson.version,
    copyright: `© ${currentYear} Bagoes Rex`,
    description: "Aplikasi untuk mengelola kontak pengguna secara mudah, cepat, dan terorganisir."
};
