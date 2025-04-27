"use client";

export default function SimpleFooter() {
  return (
    <footer className="bg-[#F9FAFB] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Greenlake City Tourism. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
