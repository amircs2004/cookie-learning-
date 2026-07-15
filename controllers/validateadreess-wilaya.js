
// for now to test it the controller works i will pass req , res 
export const validateWilaya_adressTest = async (req , res) => {
 try {
    //after i check every thing is correct i will
    const { adress, wilaya } = req.body;
    // build the query string
     const query = encodeURIComponent(`${adress} ${wilaya} algeria`)
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`
 
 // perform the fetch resuest 
  const response = await fetch(url , {
     headers : {
        'User-Agent': 'intellegantFillingSystem-Project-2026'
     }
  })
  const data = await response.json()
  //we need to check if theres a match 
    if (data && data.length > 0) {
  const result = data[0];
  const fullAddress = result.display_name.toLowerCase();
  
  // Check if the user's wilaya is present anywhere in the full address string
  // This is much safer than relying on the .state field
  const isMatch = fullAddress.includes(wilaya.toLowerCase());
  
  return res.status(200).json({ 
    isValid: isMatch, 
    fullAddress: result.display_name 
  });
}
    //  return { isValid: isMatch, fullAddress: result.display_name };
return res.status(404).json({ isValid: false, message: "Address not found" });
 
} catch (error) {
    console.error("Geocoding API Error:", error);
    return { isValid: false, message: "Server error during validation" };
 }
}

export const validateWilaya_adress = async (adress, wilaya) => {
  try {
    // 1. Build the query string
    // Standardizing the query with 'Algeria' ensures better location accuracy
    const query = encodeURIComponent(`${adress}, ${wilaya}, Algeria`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`;

    // 2. Perform the fetch request
    const response = await fetch(url, {
      headers: {
        // You MUST include a unique User-Agent as per their usage policy
        'User-Agent': 'SmartSupermarketPFE-Project-2026' 
      }
    });

    const data = await response.json();

    // 3. Check if we found a match
    if (data && data.length > 0) {
      const result = data[0];
      
      // Robust Matching: Check if the wilaya name exists anywhere in the full address
      // This bypasses inconsistencies where the 'state' field might be missing
      const fullAddress = result.display_name.toLowerCase();
      const isMatch = fullAddress.includes(wilaya.toLowerCase());
      
      return { isValid: isMatch, fullAddress: result.display_name };
    }

    return { isValid: false, message: "Address not found" };
  } catch (error) {
    console.error("Geocoding API Error:", error);
    return { isValid: false, message: "Server error during validation" };
  }
};