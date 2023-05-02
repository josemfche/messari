import { ReactSVG } from "react-svg"

const Footer = () => (
  <div className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 text-left">
        <ReactSVG src={'https://messari.io/images/messari-logo.svg'} className="w-6 h-6 inline-block mr-2" />
        </div>
        <div className="col-span-3 grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <p className="font-medium">Data</p>
          </div>
          <div className="col-span-1">
            <p className="font-medium">Insights</p>
          </div>
          <div className="col-span-1">
            <p className="font-medium">Plans</p>
          </div>
          <div className="col-span-1">
            <p className="font-medium">Company</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer