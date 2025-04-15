import axios from 'axios';

// Function to fetch dealers by stateId
export const fetchDealers = async (stateId, jwtToken) => {
  try {
    const response = await axios.get(`https://dealer-data-microservice.onrender.com/dealers/${stateId}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dealers:', error);
    throw error;
  }
};

// Function to fetch orders by dealerId
export const fetchOrders = async (dealerId, jwtToken) => {
  try {
    const response = await axios.get(`https://dealer-data-microservice.onrender.com/orders/${dealerId}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    console.log("deployed url",response.data)
    return response.data;
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchStateName = async (stateId) => {
  const response = await fetch(`https://dealer-data-microservice.onrender.com/dealers/stateName/${stateId}`);
  if (!response.ok) {
    throw new Error('Error fetching state name');
  }
  const data = await response.text(); // Assuming the backend returns a plain string
  return data;
};

export const fetchTestRideDetails= async (dealerId) => {
  try{
  const response = await axios.get(`http://localhost:8008/api/testride/bookings/dealer/${dealerId}`);
  console.log(response.data);
  return response.data;
 
}
 
  catch (error) {
    console.error('Error fetching testride details:', error);
    throw error;
  }
};
