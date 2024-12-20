import { useState } from "react";
import axios from "axios";

const StaticInfo = () => {
    const [info, setInfo] = useState<{
        name?: string;
        hobby?: string;
        favoriteFood?: string;
        birthPlace?: string;
    }>({});

    const fetchInfo = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/awesome/applicant"
            );
            setInfo(response.data);
        } catch (error) {
            console.error("Error fetching the API data:", error);
        }
    };

    return (
        <div className="person-box">
          <p>Click on my photo to learn more about me!</p>

            <img
                src="/rogerWaterfall.jpg" // Replace with the path to your picture
                alt="Picture of myself"
                onClick={fetchInfo}
            />
            <div className="person-text-box">
                {info.name && (
                    <div>
                        <h2>{info.name}</h2>
                        <p>
                            <strong>Hobby:</strong> {info.hobby}
                        </p>
                        <p>
                            <strong>Favorite Food:</strong> {info.favoriteFood}
                        </p>
                        <p>
                            <strong>Hometown:</strong> {info.birthPlace}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaticInfo;
