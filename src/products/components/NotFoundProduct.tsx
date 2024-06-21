import Link from "next/link";

export function NotFoundProduct() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-customBlue-900 tracking-widest">
        404
      </h1>
      <div className="bg-customBlue-300 px-2 text-sm rounded rotate-12 absolute">
        Producto no encontrado
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-customBlue-900 group active:text-customBlue-300 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5  group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3  border border-current rounded-[35px]">
            <Link href="/products">Ver listado de Productos</Link>
          </span>
        </div>
      </button>
    </section>
  );
}
