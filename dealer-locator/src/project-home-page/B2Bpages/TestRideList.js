import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material';
import { Phone, Email } from '@mui/icons-material'; // Importing MUI icons
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

// Vehicle data with image URLs

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
  {name:'TVS HLX 125',imageUrl:'https://www.tvsmotor.com/tvs-hlx/-/media/Feature/IB/Webp-Images/HLX-Brand/HLX-150-F/W[…]ite.webp?la=en&hash=3CD4C63BA222A0259DADD5C552786D4C3A5CA6F4'}
  ];
  

const TestRideList = ({ testride }) => {
  // Sort test rides by date in ascending order
  const sortedTestRides = [...testride].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Function to find the corresponding vehicle image
  const findVehicleImage = (vehicleName) => {
    const vehicle = vehicles.find(v => v.name === vehicleName);
    return vehicle ? vehicle.imageUrl : ''; // Return the image URL if found, else return empty string
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}> {/* Flex container with wrapping */}
      {sortedTestRides.length > 0 ? (
        sortedTestRides.map((ride, index) => (
          <Card key={index} sx={{ borderRadius: 2, boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
            <CardActionArea>
              {/* Image at the top */}
              <CardMedia
                component="img"
                height="200"
                image={findVehicleImage(ride.vehiclename)} // Get vehicle image
                alt={ride.vehiclename}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>

                 {/* Date at the top */}
                 <Typography variant="body2" color="text.secondary">
                  {new Date(ride.date).toLocaleDateString()}
                </Typography>
                {/* User name */}
                <Typography gutterBottom variant="h5" component="div">
                  {ride.name}
                </Typography>


                {/* Phone with icon */}
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <Phone sx={{ marginRight: 0.5 }} />
                  {ride.phone}
                </Typography>

                {/* Email with icon */}
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <Email sx={{ marginRight: 0.5 }} />
                  {ride.email}
                </Typography>

                {/* Vehicle name with icon */}
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                  <TwoWheelerIcon sx={{ marginRight: 0.5 }} />
                  {ride.vehiclename}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No test rides available for the selected dealer.</Typography>
      )}
    </Box>
  );
};

export default TestRideList;
