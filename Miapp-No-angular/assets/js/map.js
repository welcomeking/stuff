(function(A) {

	if (!Array.prototype.forEach)
		A.forEach = A.forEach || function(action, that) {
			for (var i = 0, l = this.length; i < l; i++)
				if (i in this)
					action.call(that, this[i], i, this);
			};

		})(Array.prototype);

		var
		mapObject,
		markers = [],
		markersData = {
			'Shop': [
			{
				name: 'Bondi Beach',
				location_latitude: 43.119445, 
				location_longitude: 131.881006,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Coogee Beach',
				location_latitude: 43.120338, 
				location_longitude: 131.883002,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.119884, 
				location_longitude: 131.882723,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.118834, 
				location_longitude: 131.889718,
				map_image_url: 'img/img4.png',
				name_point: 'Themeforest',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.120573, 
				location_longitude: 131.885705,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],
			'Cinema': [
			{
				name: 'Bondi Beach',
				location_latitude: 43.124034, 
				location_longitude: 131.883517,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Coogee Beach',
				location_latitude: 43.126117, 
				location_longitude: 131.877423,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.116657, 
				location_longitude: 131.891992,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.116031, 
				location_longitude: 131.899481,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.117519,
				location_longitude: 131.903665,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],
			'Club': [
			{
				name: 'Cronulla Beach',
				location_latitude: 43.114527, 
				location_longitude: 131.879354,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.112428, 
				location_longitude: 131.882980,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.117393, 
				location_longitude: 131.881242,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],

			'Cafe': [
			{
				name: 'Little Havana',
				location_latitude: -29.7286438, 
				location_longitude: 31.0838944,
				map_image_url: 'https://irs2.4sqi.net/img/general/300x300/9510576_g195qVDrEQdUXGerKjJOKHpaCEvrtLlSCEjDrydvfFk.jpg',
				name_point: 'Little Havana',
				description_point: 'This chic, white-decor restaurant with a colonial vibe offers Modern, Mediterranean-inspired dishes',
				url_point: '02.html'
			},
			{
				name: 'Vovo Telo',
				location_latitude: -29.727051, 
				location_longitude: 31.0829003,
				map_image_url: 'https://irs0.4sqi.net/img/general/300x300/18893687_BjAvIoiIWEB41e1PscXpnKdVtKBgX_ILoY83zScvcjQ.jpg',
				name_point: 'Vovo Telo',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Spiga d Oro',
				location_latitude: -29.8044719, 
				location_longitude: 30.9951934,
				map_image_url: 'https://irs1.4sqi.net/img/general/300x300/31089405_9TSgRzlU1N4bsQ_FawkqMdvzLSayj9TMTvkmbW3S_Q4.jpg',
				name_point: 'Spiga d Oro',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Unity Brasserie & Bar',
				location_latitude: -29.8468312, 
				location_longitude: 30.9921179,
				map_image_url: 'https://irs2.4sqi.net/img/general/300x300/IODFNCQB54OEA1ZWLOGF5O1WXVYG2OD5L54QKH41HGSE2PBF.jpg',
				name_point: 'Unity Brasserie & Bar',
				description_point: 'Lively brasserie attracting young crowds, offering craft beers and sustainably sourced comfort food',
				url_point: '02.html'
			},
			{
				name: 'Republik',
				location_latitude: -29.785173,
				location_longitude: 31.0373483,
				map_image_url: 'https://irs2.4sqi.net/img/general/200x200/2634277_1sCo5h_dVOiMouQ4vmmnIhgkmthHKqNgSlwy35oDjyk.jpg',
				name_point: 'Republik',
				description_point: 'Shop 8 Shopping Centre Corner Broadway and Kensington, Swapo Rd, Durban North, 4051',
				url_point: '02.html'
			},
			{
				name: 'Surf Riders',
				location_latitude: -29.8644179,
				location_longitude: 31.0417873,
				map_image_url: 'https://irs1.4sqi.net/img/general/300x300/77073169_Wx4I3caTO3ngccUZmt_J_nqubwPGhBGmfF-bUYtxTIE.jpg',
				name_point: 'Surf Riders',
				description_point: 'Shop 8 Shopping Centre Corner Broadway and Kensington, Swapo Rd, Durban North, 4051',
				url_point: '02.html'
			},
			{
				name: 'The corner cafe',
				location_latitude: -29.863389,
				location_longitude: 30.9945463,
				map_image_url: 'https://irs2.4sqi.net/img/general/300x300/69436737_H9UL5mzHvNayiMESf2uh1lv-0QDkeerIQ8zzU6sTSBg.jpg',
				name_point: 'The corner cafe',
				description_point: 'Shop 8 Shopping Centre Corner Broadway and Kensington, Swapo Rd, Durban North, 4051',
				url_point: '02.html'
			},
			{
				name: 'Mozambik Hillcrest',
				location_latitude: -29.7781382,
				location_longitude: 30.7638782,
				map_image_url: 'https://irs2.4sqi.net/img/general/200x200/2634277_1sCo5h_dVOiMouQ4vmmnIhgkmthHKqNgSlwy35oDjyk.jpg',
				name_point: 'Mozambik Hillcrest',
				description_point: ' This friendly restaurant is situated in the heart of Hillcrest in the Elangeni Centre and has a warm and welcoming atmosphere like its related counterparts. The comfortable and spacious dining area epitomises a Mozambican Barraca, offering a rustic feel and mouth-watering Portuguese style food.',
				url_point: '02.html'
			},
			{
				name: 'Hollywoodbets Springfield Park and Bunny Bar',
				location_latitude: -29.8237361,
				location_longitude: 30.9885157,
				map_image_url: 'https://irs2.4sqi.net/img/general/300x300/yWfH2yWm03bvXkbbCV2TaSrwx0-UjyhHulxXXBAKMjI.jpg',
				name_point: 'Hollywoodbets Springfield Park and Bunny Bar',
				description_point: 'Shop 8 Shopping Centre Corner Broadway and Kensington, Swapo Rd, Durban North, 4051',
				url_point: '02.html'
			},
			{
				name: 'Rocomamas',
				location_latitude: -29.8237165,
				location_longitude: 30.9359846,
				map_image_url: 'https://irs0.4sqi.net/img/general/200x200/13147188_YrVtd72A0bWR0BuwCxZwXfRB3kRsBKWVIRy642HCMkY.jpg',
				name_point: 'Rocomamas',
				description_point: 'We’re about building the best smashburgers, serving mofo wings and getting messy with serious ribs.',
				url_point: '02.html'
			}
			],

			'Sport': [
			{
				name: 'Bondi Beach',
				location_latitude: 43.119993, 
				location_longitude: 131.884310,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Coogee Beach',
				location_latitude: 43.119414,
				location_longitude:  131.878238,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.120573, 
				location_longitude: 131.886285,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.116454, 
				location_longitude: 131.886564,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.118223, 
				location_longitude: 131.888066,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],

			'Port': [
			{
				name: 'Bondi Beach',
				location_latitude: 43.122805, 
				location_longitude: 131.873539,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Coogee Beach',
				location_latitude: 43.118341, 
				location_longitude: 131.876714,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.113078, 
				location_longitude: 131.886671,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.111527, 
				location_longitude: 131.894954,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.112561,
				location_longitude: 131.900661,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],


			'Bank': [
			{
				name: 'UNISA',
				location_latitude: -29.8503505, 
				location_longitude: 31.028125,
				map_image_url: 'https://lh3.googleusercontent.com/-rVH8oUz54kI/WFFbslGXiMI/AAAAAAAAVfY/phaLb9zl_VAHNskini6tV69XVhDsxtfcQCLIB/s412-k-no/',
				name_point: 'UNISA',
				description_point: 'Africas leading open distance learning institution we offer internationally accredited qualifications and have worldclass resources that inspire learners to create meaningful futures on their own terms',
				url_point: '02.html'
			},
			{
				name: 'UKZN Howard College Campus',
				location_latitude: -29.8674219, 
				location_longitude: 30.9785385,
				map_image_url: 'https://irs2.4sqi.net/img/general/200x200/15326792_ebhN83ZGtGVPLwyKFJyEbGDKsmmJ6W_q6BoEsabQ_IA.jpg',
				name_point: 'UKZN Howard College Campus',
				description_point: 'A leading institution of higher learning on the African continent. The University of KwaZulu-Natal is a multi-campus, residential, teaching and research',
				url_point: '02.html'
			},
			{
				name: 'UKZN Westville Campus',
				location_latitude:-29.8207145,
				location_longitude: 30.9272,
				map_image_url: 'https://lh4.googleusercontent.com/-be1iZcn_9NY/U1LGOM96llI/AAAAAAAAADY/InPuzWL4eg41-8QsOZw0hcLSRwkL14rkwCJkC/s408-k-no/',
				name_point: 'UKZN Westville Campus',
				description_point: 'A leading institution of higher learning on the African continent. The University of KwaZulu-Natal is a multi-campus, residential, teaching and research',
				url_point: '02.html'
			},
			{
				name: 'Durban University Of Technology Ritson & Steve Biko Campus',
				location_latitude: -29.8557026,
				location_longitude: 31.0094586,
				map_image_url: 'https://lh4.googleusercontent.com/proxy/FBbrx2txiNA_phCZhvWsYYk9x9ywYwdds4vM1UQlKv9wNDK55XoOTbm_bgUhlTn4iiEYf02DNDwdCHP6QkTh3hbFGeNIlZ-gAivi3-pcQL1FbhPKYfPok507g7PKXVg3OGEsYK7eIiHaSgC3vj4F3-FQjIuI5gk=w408-h408',
				name_point: 'Durban University Of Technology Ritson Campus',
				description_point: 'The Durban University of Technology is a result of the merger in April 2002 It was named the Durban Institute of Technology and later became the Durban University of Technology.',
				url_point: '02.html'
			},
			{
				name: 'Durban University Of Technology City Campus',
				location_latitude: -29.8557026,
				location_longitude: 31.0094586 ,
				map_image_url: 'https://lh4.googleusercontent.com/proxy/FBbrx2txiNA_phCZhvWsYYk9x9ywYwdds4vM1UQlKv9wNDK55XoOTbm_bgUhlTn4iiEYf02DNDwdCHP6QkTh3hbFGeNIlZ-gAivi3-pcQL1FbhPKYfPok507g7PKXVg3OGEsYK7eIiHaSgC3vj4F3-FQjIuI5gk=w408-h408',
				name_point: 'Durban University Of Technology City Campus',
				description_point: 'The Durban University of Technology is a result of the merger in April 2002 It was named the Durban Institute of Technology and later became the Durban University of Technology.',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 41.104,
				location_longitude: -73.406,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.125451, 
				location_longitude: 131.881628,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.121113,
				location_longitude: 131.877058,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.123697, 
				location_longitude: 131.894224,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],


			'Post': [
			{
				name: 'Cronulla Beach',
				location_latitude: 43.115897, 
				location_longitude: 131.889246,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.120643, 
				location_longitude: 131.885491,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.118701, 
				location_longitude: 131.893580,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],

			'Showplace': [
			{
				name: 'Cronulla Beach',
				location_latitude: 43.119030, 
				location_longitude: 131.879225,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.115177, 
				location_longitude: 131.885576,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.113517, 
				location_longitude: 131.893730,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.119437, 
				location_longitude: 131.894095,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.122241, 
				location_longitude: 131.901949,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.113986, 
				location_longitude: 131.906970,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			],

			'Park': [
			{
				name: 'Cronulla Beach',
				location_latitude: 43.120401,
				location_longitude:  131.877208,
				map_image_url: 'img/img.png',
				name_point: 'Vladivostok',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.117801, 
				location_longitude: 131.878732,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.126266, 
				location_longitude: 131.890447,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Cronulla Beach',
				location_latitude: 43.123071, 
				location_longitude:  131.897593,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Manly Beach',
				location_latitude: 43.115161, 
				location_longitude: 131.881821,
				map_image_url: 'img/img2.png',
				name_point: 'Matart Group',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			},
			{
				name: 'Maroubra Beach',
				location_latitude: 43.119265, 
				location_longitude: 131.900146,
				map_image_url: 'img/img3.png',
				name_point: 'Envato',
				description_point: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard',
				url_point: '02.html'
			}
			]
		};

		function initialize () {
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(-29.8591335,31.010372),
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: false,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				styles: [/*insert your map styles*/]
			};
			var
			marker;
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
			for (var key in markersData)
				markersData[key].forEach(function (item) {
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
						map: mapObject,
						icon: 'assets/images/icon/' + key + '.png',
					});

					if ('undefined' === typeof markers[key])
						markers[key] = [];
					markers[key].push(marker);
					google.maps.event.addListener(marker, 'click', (function () {
      closeInfoBox();
      getInfoBox(item).open(mapObject, this);
      mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
     }));

					
				});
		};

		function hideAllMarkers () {
			for (var key in markers)
				markers[key].forEach(function (marker) {
					marker.setMap(null);
				});
		};

		function toggleMarkers (category) {
			hideAllMarkers();
			closeInfoBox();

			if ('undefined' === typeof markers[category])
				return false;
			markers[category].forEach(function (marker) {
				marker.setMap(mapObject);
				marker.setAnimation(google.maps.Animation.DROP);

			});
		};
		
		function closeInfoBox() {
			$('div.infoBox').remove();
		};

		function getInfoBox(item) {
			return new InfoBox({
				content:
				'<div class="marker_info none" id="marker_info">' +
				'<div class="info" id="info">'+
				'<img src="' + item.map_image_url + '" class="logotype" alt=""/>' +
				'<h2>'+ item.name_point +'<span></span></h2>' +
				'<span>'+ item.description_point +'</span>' +
				'<a href="'+ item.url_point + '" class="green_btn">More info</a>' +
				'<span class="arrow"></span>' +
				'</div>' +
				'</div>',
				disableAutoPan: true,
				maxWidth: 0,
				pixelOffset: new google.maps.Size(40, -210),
				closeBoxMargin: '50px 200px',
				closeBoxURL: '',
				isHidden: false,
				pane: 'floatPane',
				enableEventPropagation: true
			});


		};




