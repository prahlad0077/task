import React, { useState } from 'react';


const itemsData = [
  { id: 1, name: "Item 1", price: 10, weight: 200 },
  { id: 2, name: "Item 2", price: 100, weight: 20 },
  { id: 3, name: "Item 3", price: 30, weight: 300 },
  { id: 4, name: "Item 4", price: 20, weight: 500 },
  { id: 5, name: "Item 5", price: 30, weight: 250 },
  { id: 6, name: "Item 6", price: 40, weight: 10 },
  { id: 7, name: "Item 7", price: 200, weight: 10 },
  { id: 8, name: "Item 8", price: 120, weight: 500 },
  { id: 9, name: "Item 9", price: 130, weight: 790 },
  { id: 10, name: "Item 10", price: 20, weight: 100 },
  { id: 11, name: "Item 11", price: 10, weight: 340 },
  { id: 12, name: "Item 12", price: 4, weight: 800 },
  { id: 13, name: "Item 13", price: 5, weight: 200 },
  { id: 14, name: "Item 14", price: 240, weight: 20 },
  { id: 15, name: "Item 15", price: 123, weight: 700 },
  { id: 16, name: "Item 16", price: 245, weight: 10 },
  { id: 17, name: "Item 17", price: 230, weight: 20 },
  { id: 18, name: "Item 18", price: 110, weight: 200 },
  { id: 19, name: "Item 19", price: 45, weight: 200 },
  { id: 20, name: "Item 20", price: 67, weight: 20 },
  { id: 21, name: "Item 21", price: 88, weight: 300 },
  { id: 22, name: "Item 22", price: 10, weight: 500 },
  { id: 23, name: "Item 23", price: 17, weight: 250 },
  { id: 24, name: "Item 24", price: 19, weight: 10 },
  { id: 25, name: "Item 25", price: 89, weight: 10 },
  { id: 26, name: "Item 26", price: 45, weight: 500 },
  { id: 27, name: "Item 27", price: 99, weight: 790 },
  { id: 28, name: "Item 28", price: 125, weight: 100 },
  { id: 29, name: "Item 29", price: 198, weight: 340 },
  { id: 30, name: "Item 30", price: 220, weight: 800 },
  { id: 31, name: "Item 31", price: 249, weight: 200 },
  { id: 32, name: "Item 32", price: 230, weight: 20 },
  { id: 33, name: "Item 33", price: 190, weight: 700 },
  { id: 34, name: "Item 34", price: 45, weight: 10 },
  { id: 35, name: "Item 35", price: 12, weight: 20 },
  { id: 36, name: "Item 36", price: 5, weight: 200 },
  { id: 37, name: "Item 37", price: 2, weight: 200 },
  { id: 38, name: "Item 38", price: 90, weight: 20 },
  { id: 39, name: "Item 39", price: 12, weight: 300 },
  { id: 40, name: "Item 40", price: 167, weight: 500 },
  { id: 41, name: "Item 41", price: 12, weight: 250 },
  { id: 42, name: "Item 42", price: 8, weight: 10 },
  { id: 43, name: "Item 43", price: 2, weight: 10 },
  { id: 44, name: "Item 44", price: 9, weight: 500 },
  { id: 45, name: "Item 45", price: 210, weight: 790 },
  { id: 46, name: "Item 46", price: 167, weight: 100 },
  { id: 47, name: "Item 47", price: 23, weight: 340 },
  { id: 48, name: "Item 48", price: 190, weight: 800 },
  { id: 49, name: "Item 49", price: 199, weight: 200 },
  { id: 50, name: "Item 50", price: 12, weight: 20 }
];

// Functional component for Order System
const OrderSystem = () => {
  // State variables to manage selected items and packages
  const [selectedItems, setSelectedItems] = useState([]);
  const [packages, setPackages] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    // Extracting item id and checked status from the event
    const itemId = parseInt(event.target.id);
    const isChecked = event.target.checked;
    // Finding the selected item from itemsData
    const selectedItem = itemsData.find(item => item.id === itemId);

    // Adding or removing item based on checkbox status
    if (isChecked) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    }
  };

  // Function to place order
  const placeOrder = () => {
    // Courier charges and maximum package cost
    const courierCharges = [
      { weight: 200, charge: 5 },
      { weight: 500, charge: 10 },
      { weight: 1000, charge: 15 },
      { weight: 5000, charge: 20 }
    ];
    const MAX_PACKAGE_COST = 250;

    // Sorting selected items by weight in descending order
    const sortedItems = selectedItems.slice().sort((a, b) => b.weight - a.weight);

    // Variables for managing packages
    let currentPackage = [];
    let tempPackages = [];
    let currentPackageWeight = 0;
    let currentPackageCost = 0;

    // Function to calculate courier price based on weight
    const calculateCourierPrice = (weight) => {
      const courierCharge = courierCharges.find(charge => charge.weight >= weight);
      return courierCharge ? courierCharge.charge : 0;
    };

    // Function to add current package to tempPackages array
    const addCurrentPackage = () => {
      const courierPrice = calculateCourierPrice(currentPackageWeight);
      tempPackages.push({ items: currentPackage, totalWeight: currentPackageWeight, totalCost: currentPackageCost, courierPrice: courierPrice });
      currentPackage = [];
      currentPackageWeight = 0;
      currentPackageCost = 0;
    };

    sortedItems.forEach(item => {
      if (currentPackageCost + item.price > MAX_PACKAGE_COST) {
        addCurrentPackage();
      }

      currentPackage.push(item);
      currentPackageWeight += item.weight;
      currentPackageCost += item.price;
    });

    if (currentPackage.length > 0) {
      addCurrentPackage();
    }

    setPackages(tempPackages);
  };

  // JSX for rendering component
  return (
    <div>
      <h2>Order System</h2>
      <div>
        
        {itemsData.map(item => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              name={item.name}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={item.id}>{`${item.name} - $${item.price} - ${item.weight}g`}</label>
          </div>
        ))}
      </div>
      
      <button onClick={placeOrder}>Place Order</button>
      
      {packages.length > 0 && (
        <div>
          <h3>Order Details</h3>
          
          {packages.map((pkg, index) => (
            <div key={index}>
              <h4>Package {index + 1}</h4>
              
              <p>Total items: {pkg.items.map(item => (
                  <span key={item.id}>{item.name} </span>
                ))}</p>
              
              <p>Total weight: {pkg.totalWeight}g</p>
              <p>Total cost: ${pkg.totalCost}</p>
              <p>Courier price: ${pkg.courierPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSystem;

