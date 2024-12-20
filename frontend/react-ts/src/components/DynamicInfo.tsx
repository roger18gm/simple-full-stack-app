import { useState } from "react";
import axios from "axios";

const DynamicInfo = () => {
    const [dbInfo, setDbInfo] = useState<{
        id?: number;
        name?: string;
        hobby?: string;
        favorite_food?: string;
        birth_place?: string;
    }>({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        hobby: "",
        favorite_food: "",
        birth_place: "",
    });

    const fetchDatabaseInfo = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/awesome/applicant/db"
            );
            setDbInfo(response.data[0]);
            setFormData({
                name: response.data[0].name || "",
                hobby: response.data[0].hobby || "",
                favorite_food: response.data[0].favorite_food || "",
                birth_place: response.data[0].birth_place || "",
            });
        } catch (error) {
            console.error("Error fetching the API data:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.post("http://localhost:8080/awesome/applicant/db", {
                id: dbInfo.id,
                ...formData,
            });
            setIsEditing(false); // Exit editing mode
            fetchDatabaseInfo(); // Refresh data
        } catch (error) {
            console.error("Error updating the API data:", error);
        }
    };

    return (
        <div className="person-box">
            <p className="desc">Click on the panda to edit my info or update it with yours below!
                Use the form below to change the values within the database. 
                Press 'Save' to submit your response or 'Cancel' to exit.
            </p>
            <img
                src="/panda.png"
                alt="Picture of myself"
                onClick={fetchDatabaseInfo}
            />
            <div className="person-text-box">
                {dbInfo.name && !isEditing && (
                    <div>
                        <h2>{dbInfo.name}</h2>
                        <p>
                            <strong>Hobby:</strong> {dbInfo.hobby}
                        </p>
                        <p>
                            <strong>Favorite Food:</strong> {dbInfo.favorite_food}
                        </p>
                        <p>
                            <strong>Hometown:</strong> {dbInfo.birth_place}
                        </p>
                        <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                )}
                {isEditing && (
                    <form
                        style={{ marginTop: "20px" }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate();
                        }}
                    >
                        <div className="label-input-box">
                            <label>
                                Name:  
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                        </div>
                        <div className="label-input-box">
                            <label>
                                Hobby:
                            </label>
                                <input
                                    type="text"
                                    name="hobby"
                                    value={formData.hobby}
                                    onChange={handleInputChange}
                                />
                        </div>
                        <div className="label-input-box">
                            <label>
                                Favorite Food:
                            </label>
                                <input
                                    type="text"
                                    name="favorite_food"
                                    value={formData.favorite_food}
                                    onChange={handleInputChange}
                                />
                        </div>
                        <div className="label-input-box">
                            <label>
                                Birth Place:
                            </label>
                                <input
                                    type="text"
                                    name="birth_place"
                                    value={formData.birth_place}
                                    onChange={handleInputChange}
                                />
                        </div>
                        <div className="">
                            <button className="save"type="submit">Save</button>
                            <button
                                className="cancel"
                                type="button"
                                onClick={() => setIsEditing(false)}
                                style={{ marginLeft: "10px" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default DynamicInfo;
