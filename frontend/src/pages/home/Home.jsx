import './Home.css'
import {Topbar, Feed, Rightbar, Sidebar} from '../../components'

const Home = () => {
    return <>
    <Topbar />
    <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
    </div>
    </>
}

export default Home


