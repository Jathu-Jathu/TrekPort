export default function Footer() {
  return (
    <footer className="bg-light border-top py-3 mt-5">
      <p className="text-center text-muted mb-0">
        © {new Date().getFullYear()} TrekPort. All rights reserved.
      </p>
    </footer>
  );
}