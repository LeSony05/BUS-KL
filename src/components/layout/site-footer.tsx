export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-black">An Tam Bus</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Nen tang dat ve xe, tra cuu, gui hang va van hanh noi bo duoc thiet ke theo dung dac ta UI/UX cua project.
          </p>
        </div>
        <div>
          <p className="font-bold">Khach hang</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Tim chuyen</li>
            <li>Tra cuu ve</li>
            <li>Chinh sach huy ve</li>
          </ul>
        </div>
        <div>
          <p className="font-bold">Van hanh</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Quan ly chuyen</li>
            <li>Quan ly ve</li>
            <li>Bao cao doanh thu</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
