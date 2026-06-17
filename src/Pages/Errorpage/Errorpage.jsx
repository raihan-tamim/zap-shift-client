import { Link } from 'react-router';
import errorImg from '../../assets/error.png'

const Errorpage = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center h-[680px]'>
            <img className="" src={errorImg} alt="" />
            <Link to='/' className='btn btn-primary text-black'>Go Home</Link>
        </div>
        </div>
    );
};

export default Errorpage;