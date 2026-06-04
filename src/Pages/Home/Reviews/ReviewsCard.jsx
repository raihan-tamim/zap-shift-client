import { FaQuoteLeft } from "react-icons/fa";


const ReviewsCard = ({ reviews }) => {
    const { userName, ratings, review, user_photoURL, date } = reviews;
    
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-8 max-w-sm">

            {/* Quote */}
            <FaQuoteLeft className="text-4xl text-primary mb-5" />

            {/* Content */}
            <p className="text-secondary">
                {review}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-secondary/50 my-6"></div>

            {/* Profile */}
            <div className="flex items-center gap-4">
                <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-14">
                        <img src={user_photoURL} alt="" />
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-secondary text-lg">
                        {userName}
                    </h3>

                    <p className="text-sm text-base-content/60">
                        Senior Product Designer
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;