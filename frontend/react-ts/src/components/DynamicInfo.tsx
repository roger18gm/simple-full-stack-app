import { useState } from "react";
import axios from "axios"; // Used for HTTP requests to APIs

const DynamicInfo = () => {
    const [dbInfo, setDbInfo] = useState<{
        id?: number;
        name?: string;
        hobby?: string;
        favorite_food?: string;
        birth_place?: string;
    }>({});

    // State for when the form is open and in editing mode
    const [isEditing, setIsEditing] = useState(false);

    // Form field values that will be editable
    const [formData, setFormData] = useState({
        name: "",
        hobby: "",
        favorite_food: "",
        birth_place: "",
    });

    // Called when user clicks on image
    const fetchDatabaseInfo = async () => {
        try {
            // Get route from backend
            const response = await axios.get(
                `https://simple-full-stack-app-e23i.onrender.com/awesome/applicant/db`
            );
            // Since the response is an array of clients (records), grab the first one
            setDbInfo(response.data[0]);

            // Place the database record information into the editable form fields
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
    // Changes the values of the input field as it is edited
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            // Send the updated values to route and database
            await axios.post("http://localhost:8080/awesome/applicant/db", {
                id: dbInfo.id,
                ...formData,
            });
            setIsEditing(false); // Exit editing mode
            fetchDatabaseInfo(); // Refresh data with new values
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
                {/* Database values are displayed when the user hasn't clicked on Edit */}
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

                        {/* Enters editing mode and displays the edit form */}
                        <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                )}

                {/* Edit form for a user to update database values  */}
                {isEditing && (
                    <form
                        style={{ marginTop: "20px" }}
                        onSubmit={(e) => {
                            // Stops page refresh on submit and pushes update to backend
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
