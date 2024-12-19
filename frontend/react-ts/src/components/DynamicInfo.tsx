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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <img
                src="/panda.png"
                alt="Picture of myself"
                style={{ width: "200px", borderRadius: "5%", cursor: "pointer" }}
                onClick={fetchDatabaseInfo}
            />
            <div style={{ marginTop: "20px" }}>
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
                        <button onClick={() => setIsEditing(true)}>Edit</button>
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
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Hobby:
                                <input
                                    type="text"
                                    name="hobby"
                                    value={formData.hobby}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Favorite Food:
                                <input
                                    type="text"
                                    name="favorite_food"
                                    value={formData.favorite_food}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Birth Place:
                                <input
                                    type="text"
                                    name="birth_place"
                                    value={formData.birth_place}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <button type="submit">Save</button>
                            <button
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
