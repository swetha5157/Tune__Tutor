/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { courses } from "../coursedata";
import { Link } from 'react-router-dom';

const LearnLanding = () => {
    // eslint-disable-next-line no-unused-vars
    const orderCategory = useSelector(state => state.cart.items);
    const categoriesInCart = orderCategory.map(item => item.category);
     
    const course = courses.filter(course => 
        categoriesInCart.includes(course.category)
    );

    return (
        <>
            <div>
                <h1>Courses available are....</h1>
                {
                    course.length ? 
                    (
                        <div className="course-list">
                            {course.map((i, index) => (
                                <div key={index} className="course-card" style={{ backgroundImage: `url(${i.img})` }}>
                                    <div className="course-details">
                                        <Link to={"/learn/" + i.courseId}>{i.name}</Link>
                                        <img src="i.imageUrl"></img>                                     
                                        <p>Users Enrolled: {i.users}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : 
                    (<p>No courses available in the cart.</p>)
                }
            </div>
        </>
    );
};

export default LearnLanding;
