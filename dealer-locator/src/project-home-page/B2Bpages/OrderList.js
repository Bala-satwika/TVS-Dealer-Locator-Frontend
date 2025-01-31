import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Navbar from './Navbar';
import './OrderList.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';

const vehicles = [
  { name: 'TVS Apache RR 310', imageUrl: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-akula-310/640X309/tvs-akula-31066e8234da949d.jpg' },
  { name: 'TVS Apache RTR 200 4V', imageUrl: 'https://stat.overdrive.in/wp-content/uploads/2021/01/TVS-Apache-RTR-200-4V-vs-Honda-Hornet-2.0-14-of-160-900x506.jpg'  },
  { name: 'TVS Sport', imageUrl:'https://bd.gaadicdn.com/processedimages/tvs/tvs-sport/494X300/tvs-sport65eebab757682.jpg?imwidth=400&impolicy=resize'  },
  { name: 'TVS Scooty Zest 110', imageUrl: 'https://imgd.aeplcdn.com/642x361/n/cw/ec/47454/tvs-scooty-zest-left-side-view0.jpeg?q=80' },
  { name: 'TVS iQube S', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-wallnut-brown-1715634491365.png?q=80' },
  { name: 'TVS Apache', imageUrl: 'https://bd.gaadicdn.com/processedimages/tvs/apache-160/650X420/apache-1606319c53d7f639.jpg?imwidth=400&impolicy=resize'  },
  { name: 'TVS XL100 Heavy Duty', imageUrl: 'https://bd.gaadicdn.com/processedimages/tvs/tvs-xl100/494X300/tvs-xl10065ec3eaf41470.jpg?imwidth=400&impolicy=resize' },
  { name: 'TVS Apache RTR 180', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-gloss-black-1697709128183.jpg?q=80'  },
  { name: 'TVS NTorq 125', imageUrl: 'https://bd.gaadicdn.com/processedimages/tvs/ntorq-125/494X300/ntorq-125663b093a09c18.jpg?imwidth=400&impolicy=resize'  },
  { name: 'TVS Raider 125', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--drum1727090924411.jpg?q=80'  },
  { name: 'TVS Radeon', imageUrl: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/51508/radeon-right-side-view-2.png?isig=0&q=80&wm=3'  },
  { name: 'TVS Jupiter', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80' },
  { name: 'TVS iQube', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-wallnut-brown-1715634491365.png?q=80'},
  { name: 'TVS iQube Electric', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-wallnut-brown-1715634491365.png?q=80' },
  { name: 'TVS Star City Plus', imageUrl: ' https://img.indianautosblog.com/2017/09/TVS-Star-City-Plus-Dual-Tone-edition.jpg' },
  { name: 'TVS Victor', imageUrl: 'https://i.ndtvimg.com/i/2018-01/tvs-victor-premium-edition-matte-series_827x551_61515417685.jpg' },
  { name: 'TVS Scooty Pep Plus', imageUrl: ' http://images.carandbike.com/bike-images/colors/tvs/scooty-pep-plus/tvs-scooty-pep-plus-gorgeous-grey.jpg' },
  { name: 'TVS XL100 Comfort', imageUrl: ' https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/m[…]s/TVS-XL-100-Comfort-130120211618.jpg&w=730&h=484&q=75&c=1' },
  { name: 'TVS Apache RTR 160', imageUrl: 'https://img.indianautosblog.com/2017/09/TVS-Apache-RTR-160-Matte-Red-studio-shot.jpg' },
  { name: 'TVS Jupiter ZX', imageUrl: ' https://gaadiwaadi.com/wp-content/uploads/2021/02/TVS-Jupiter-Starlight-Blue-ZX-Disc-with-IntelliGo-1536x1185.jpg' },
  { name: 'TVS Apache RTR 160 4V', imageUrl: 'https://placervial.com/wp-content/uploads/2019/05/apache-160-01.jpg' },
  { name: 'TVS Jupiter Classic', imageUrl: 'https://ic1.maxabout.us/autos/tw_india/T/2020/6/tvs-jupiter-classic-in-sunlit-ivory-color.jpg' },
  { name: 'TVS Raider', imageUrl: 'https://ik.imagekit.io/maxabout/all/images/autos/tw_india/T/2023/8/tvs-raider-125-black-panther-edition-front-3-quart.jpg' },
  { name: 'TVS iQube ST', imageUrl: 'https://ic1.maxabout.us/autos/tw_india/T/2022/5/tvs-iqube-st-side-view.jpg' },
  { name: 'TVS NTorq', imageUrl: 'https://bd.gaadicdn.com/processedimages/tvs/ntorq-125/494X300/ntorq-125663b093a09c18.jpg?imwidth=400&impolicy=resize' },
  { name: 'TVS Scooty Zest', imageUrl: 'https://imgd.aeplcdn.com/642x361/n/cw/ec/47454/tvs-scooty-zest-left-side-view0.jpeg?q=80' },
  { name: 'TVS Jupiter 100', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80' },
 { name: 'TVS Jupiter 125', imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/tvs-jupiter-drum1725609174080.jpg?q=80' },
{name:'TVS Apache RTR 200',imageUrl:'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-gloss-black-1697709128183.jpg?q=80'}
,{name:'TVS Apache 160V' ,imageUrl:'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-select-model-gloss-black-1697709128183.jpg?q=80'},
{name:'TVS Ronin 225',imageUrl:'https://imgd.aeplcdn.com/664x374/n/cw/ec/124775/ronin-right-side-view-7.png?isig=0&q=80'},
{name:'TVS HLX 125',imageUrl:'https://www.tvsmotor.com/tvs-hlx/-/media/Feature/HLX/Colors/HLX-150-5-gear/BLUE-web.png?la=en&h=477&w=733&hash=B93E970A6B54D440D5FA2F1252C9FD08AC770987'}
];

const OrderList = () => {
  const { dealerId } = useParams();
  const [orders, setOrders] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  useEffect(() => {
    axios
      .get(`http://localhost:8010/api/dealers/orders?dealerId=${dealerId}`)
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [dealerId]);

  const getStatusIcon = (status) => {
    if (status === 'Pending') {
      return <PendingIcon style={{ fontSize: '24px', color: 'orange' }} />;
    }
    if (status === 'Shipped') {
      return <LocalShippingIcon style={{ fontSize: '24px', color: 'blue' }} />;
    }
    if (status === 'Delivered') {
      return <CheckCircleIcon style={{ fontSize: '24px', color: 'green' }} />;
    }
    return null;
  };

  const getVehicleImage = (productName) => {
    const vehicle = vehicles.find(v => v.name === productName);
    return vehicle ? vehicle.imageUrl : 'default_image_url';
  };

  const pieChartData = orders.flatMap(order =>
    order.items.map(item => ({
      name: item.product,
      quantity: item.quantity,
    }))
  );

  return (
    <>
      <Navbar />
      <div id="order-list-container">
        <h2>Order List for Dealer {dealerId}</h2>
        {orders.length > 0 ? (
          <div id="order-list-details">
            <div id="order-cards-container">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-card">
                      <img src={getVehicleImage(item.product)} alt={item.product} className="vehicle-image" />
                      <div className="order-item-details">
                        <h4>{item.product}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Status: {getStatusIcon(item.status)} {item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div id="order-pie-chart" className="pie-chart-wrapper" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
  <PieChart width={400} height={400}>
    <Pie
      data={pieChartData}
      cx={200} // Center horizontally
      cy={160} // Adjust this to place it closer to the top
      outerRadius={150}
      fill="#8884D8"
      dataKey="quantity"
      labelLine={false} // Removes the lines
      label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
        // Calculate position to place the label on the radius
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${pieChartData[index].quantity}`}
          </text>
        );
      }}
    >
      {pieChartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  <div id="pie-chart-legend" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
    {pieChartData.map((entry, index) => (
      <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: COLORS[index % COLORS.length],
            marginRight: '10px',
          }}
        />
        {entry.name}: {entry.quantity}
      </div>
    ))}
  </div>
</div>
  
          </div>
        ) : (
          <p>No orders found for this dealer.</p>
        )}
      </div>
    </>
  );
};

export default OrderList;
