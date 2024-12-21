# Car Parts Shop

## 📜 System's Purpose
This website is for system which is designed for individuals to post advertisements for car parts sourced from used vehicles. The system will consist of three components:
1. A **web application**.  
2. A **database**.  
3. An **API** that connects the web application and the database.

To post an advertisement on this system, a person needs to register, create their own shop, and then create an advertisement. In the advertisement, they must provide information about the car from which the parts are being sold, and the advertisement will be assigned to a selected shop. After providing information about the car, the user specifies which parts from the car are for sale. Once the advertisement is posted, it becomes visible to all system users, including unregistered ones.

## 🛠 Functional requirements
### Unregistered users can:
- 🔑 Log in
- ✍️ Register
- 👀 View:
  - Advertisements
  - Shops
  - Parts

### Registered users can:
- 🚪 Log out
- 🏪 Create a Shop:
  - Enter shop name
  - Specify shop location
- 📣 Post Advertisements:
  - Car Details:
    - Car make, model, body type, fuel type, gearbox type
    - First registration date
    - Mileage, displacement, and power
  - Parts Details:
    - Part name
    - Price
- ✏️ Modify:
  - Ads, vehicle information, or part details
- ❌ Delete:
  - Ads, shops, or parts for sale

### Administrators can:
- ✏️ Modify (all users'):
  - Ads, vehicle information, or part details
- ❌ Delete (all users'):
  - Ads, shops, or parts for sale
