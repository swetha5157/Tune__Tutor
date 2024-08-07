/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../coursedata'; // Adjust the path to where your data is

const MainCourse = () => {
    const { learnId } = useParams();

    const course = courses.find(c => c.courseId === learnId);
    const [selectedVideo,setSelectedVideo]=useState(course.videos[0]);
    console.log(course);
    const [progress, setProgress] = useState(
        course.videos.reduce((acc, video) => {
            acc[video.videoId] = 0;
            return acc;
        }, {})
    );

   
    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        
    };

    const handleTimeUpdate = (event) => {
        const videoElement = event.target;
        const currentProgress = (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(prev=>({
            ...prev,
            [selectedVideo.videoId]:currentProgress
        }));
    };
    const calculateOverallProgress = () => {
        const totalVideos = course.videos.length;
        const totalProgress = Object.values(progress).reduce((acc, pro) => acc + pro, 0);
        return totalProgress / totalVideos;
    }
    

    const allVideosCompleted = () => {
        return Object.values(progress).every(pro => pro === 100);
    };

    const handleBackClick = () => {
        history.push('/courses'); 
    };
    return ( 
        <>  
         <div className="course-progress">
                    <h4>Overall Course Progress</h4>
                    <div className="progress">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${calculateOverallProgress()}%` }}
                        />
                    </div>
                </div>
                {allVideosCompleted() && (
                <div className="completion-message">
                    <h3>Successfully Completed!</h3>
                    <button onClick={handleBackClick}>Back to Courses</button>
                </div>
            )}
        <div className='coursemain'>
        <div className='sidebar'>
            <ul>
                {course.videos.map(video=>(
                    <li type="none"
                     key={video.videoId} 
                     className={`list ${video.videoId === selectedVideo.videoId ? 'active' : ''}`}
                     onClick={() => handleVideoSelect(video)}
                     >
                        {video.title}
                    </li>
                ))}
            </ul>
        </div>
        <div className='showvideo'>
            <div className='videoarea'>
                <video 
                src={selectedVideo.url}
                controls
                onTimeUpdate={handleTimeUpdate}
                ></video>
                 <h3>{selectedVideo.title}</h3>
               
                   
            </div>
        </div>
        </div>
        </>
    );
};

export default MainCourse;
