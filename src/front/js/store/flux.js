
import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// message: null,
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
			alquileres: [
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 1,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 2,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 3,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 4,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 5,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 6,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 7,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 8,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 9,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 10,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 11,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 12,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 13,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 14,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 15,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 16,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 17,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Alquiler",
					"description": "Melo",
					"id": 18,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				}
			],
			ventas: [
				{
					"category": "Venta",
					"description": "Melo",
					"id": 1,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 2,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 3,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 4,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 5,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 6,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 7,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 8,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 9,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 10,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 11,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 12,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 13,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/yfsd0ivntxrgifwgsbgx.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 14,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873944/wzawxlmlfpqmwwgjyxdd.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 15,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/ae7yjjicl4biriwbfchs.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 16,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/wc5jvjnpv8t4egwzkkz8.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 17,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/duozkj3ehfvji9zoeiuq.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				},
				{
					"category": "Venta",
					"description": "Melo",
					"id": 18,
					"image_url": "https://res.cloudinary.com/dslz0zdlc/image/upload/v1694873945/aoteeureorya8aioyhkm.webp",
					"location": "Melo, Cerro Largo",
					"numberOfBathrooms": 2,
					"numberOfRooms": 1,
					"parking": true,
					"price": 20000,
					"title": "Melo",
					"user_id": 1,
					"virified_account": true,
					"wifi": false
				}
			],
			casa: {},
			auth: false,
			perfil: {},
			favoritos: []
		},
		actions: {

			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					// console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			signup: async (firstName, lastName, email, password, phone, confpassword) => {

				try {
					let data = await axios.post(process.env.BACKEND_URL + "/api/signup", {

						"name": firstName,
						"lastname": lastName,
						"email": email,
						"phone_number": phone,
						"password": password,
						"is_admin": false

					})

					return true;

				} catch (error) {

					if (error.response.status === 404) {
						alert(error.response.data.msg)

					}
					return false;
				}

			},



			validToken: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/valid_token',
						{
							headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
						})
					setStore({ auth: true })
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}
			},

			getPerfil: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/perfil',

						{
							headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
						})
					setStore({ perfil: data.data })
					console.log(getStore().perfil);

					return true
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}
			},

			login: async (email, password) => {
				try {
					let data = await axios.post(process.env.BACKEND_URL + '/api/login',
						{
							"email": email,
							"password": password
						})
					console.log(data);
					localStorage.setItem("token", data.data.access_token)
					setStore({ auth: true })
					return true
				} catch (error) {
					console.log(error);
					if (error.response.status === 404) {
						alert(error.response.data.msg)
					}
					return false
				}
			},

			logout: async () => {
				localStorage.removeItem('token')
				setStore({ auth: false })
			},

			getAlquileres: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/rent')
					setStore({ alquileres: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}

			},
			getVentas: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/sell')
					setStore({ ventas: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false
				}
			},

			getDetalles: async (id) => {
				console.log(id);
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouse/' + id)
					setStore({ casa: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false


				}

			},

			getFavoritos: async () => {

				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/usuario/favorito',
						{
							headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
						})
					console.log(data.data.results);
					setStore({ "favoritos": data.data.results })

				} catch (error) {
					console.log(error);
					// if (error.response.status === 404) {
					// 	alert(error.response.data.msj)
					// }
					return false

				}

			},
			getPerfilProp: async (id) => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/user/' + id)
					// setStore({ alquileres: data.data.results });
					console.log(data.data.results);
				} catch (error) {
					console.log(error);
					
					return false
				}

			}




		}
	}
};


export default getState;
