import request from "supertest";
import myApp from "../src/app";

const mockDbPool = {
    query: jest.fn(), // Mock the query function
};

  
describe("App Routes", () => {
  let app: any;

  beforeEach(() => {
    // Create a new app instance for each test with the mocked dbPool
    app = myApp(mockDbPool);
  });

  afterEach(() => {
    // Resets all mocks after each test
    jest.clearAllMocks();
  });

  test("GET /awesome/applicant should return hardcoded info", async () => {
    const response = await request(app).get("/awesome/applicant");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: "Roger Galan-Manzano",
      hobby: "There are many things that I like to do and some vary on the season, but I really enjoy playing video games and playing volleyball!",
      favoriteFood: "Anything spicy so Mexican platters are the most delicious to me.",
      birthPlace: "Born and lived in Kentucky until my teenage years.",
    });
  });


  test("GET /awesome/applicant/db should return mocked database response", async () => {
    // Mock the database query to return specific data
    mockDbPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, name: "Mock Name", hobby: "Mock Hobby", favorite_food: "Mock Food", birth_place: "Mock Place" }],
    });
  
    const response = await request(app).get("/awesome/applicant/db");
  
    expect(mockDbPool.query).toHaveBeenCalledTimes(1);
    expect(mockDbPool.query).toHaveBeenCalledWith('SELECT * FROM person_info WHERE id = 1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Mock Name", hobby: "Mock Hobby", favorite_food: "Mock Food", birth_place: "Mock Place" },
    ]);
  });


  test("GET /awesome/applicant/db should handle database errors gracefully", async () => {
    // Mock the database query to throw an error
    mockDbPool.query.mockRejectedValueOnce(new Error("Database connection failed"));
  
    const response = await request(app).get("/awesome/applicant/db");
  
    expect(mockDbPool.query).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error querying database");
  });
  
  
  test("GET /invalid-route should return 404", async () => {
    const response = await request(app).get("/invalid-route");
    expect(response.status).toBe(404);
  });
  
});
