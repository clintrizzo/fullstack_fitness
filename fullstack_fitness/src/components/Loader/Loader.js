import ReactDOM from 'react-dom'
import loaderImg from '../../assets/loader.gif'
import styles from './Loader.css'

const Loader = () => {
  return ReactDOM.createPortal (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..."/>
      </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader