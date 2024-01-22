import { Oval } from 'react-loader-spinner'
import './Preloader.scss'

const Preloader = () => {
  return (
    <div className="preloader-space">
      <Oval
        height={120}
        width={120}
        color="#1142AA"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="#4573D5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default Preloader
