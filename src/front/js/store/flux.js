
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
			propietario: [],
			alquileres: [],
			filterRent: [],
			filterSales: [],
			ventas: [],
			mercadoPago: {},
			casa: {
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
			},
			auth: false,
			perfil: {},
			favoritos: [],
			casaPropietario: [],
			upgradePlans: [
				{
				  typeOfPlan: "Starter",
				  priceAMonth: 10,
				  benefit1: "Mayor visibilidad (7 días)",
				  benefit2: "Publica hasta 10 fotos",
				  benefit3: "Soporte por correo electrónico",
				  planValue: 1,
				},
				{
				  typeOfPlan: "Pro",
				  priceAMonth: 20,
				  benefit1: "Mayor visibilidad (1 mes)",
				  benefit2: "Publica hasta 15 fotos",
				  benefit3: "Soporte por correo electrónico",
				  planValue: 2,
				},
			]
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
			signup: async ({ firstName, lastName, email, password, phone, confpassword }) => {
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
					return true
				} catch (error) {
					console.log(error);
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
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			login: async ({ email, password }) => {
				try {
					let data = await axios.post(process.env.BACKEND_URL + '/api/login',
						{
							"email": email,
							"password": password
						})
					localStorage.setItem("token", data.data.access_token)
					localStorage.setItem("user_id", data.data.user.id)
					setStore({ perfil: data.data.user });
					setStore({ auth: true })
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},
			logout: async () => {
				localStorage.removeItem('token')
				setStore({ perfil: {} })
				setStore({ auth: false })
			},
			getAlquileres: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/rent')

					const orderByPriority = data.data.results.sort((a, b) => {
						if (b.priority > a.priority) {
							return 1;
						} else if (b.priority < a.priority) {
							return -1;
						}
						return 0;
					})
					setStore({ alquileres: orderByPriority });
					setStore({ orderRentItems: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}
			},
			getVentas: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouses/sell')
					const orderByPriority = data.data.results.sort((a, b) => {
						if (b.priority > a.priority) {
							return 1;
						} else if (b.priority < a.priority) {
							return -1;
						}
						return 0;
					})
					setStore({ ventas: orderByPriority });
					setStore({ orderSellItems: data.data.results });
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			filterRentByPrice: (minPriceSlider, maxPriceSlider) => {
				const rentalFiltered = getStore().alquileres.filter(item => (
					item.price > minPriceSlider && item.price < maxPriceSlider && item
				))

				const orderSalesByPrice = rentalFiltered.sort((a, b) => {
					if (a.price > b.price) {
						return 1;
					} else if (a.price < b.price) {
						return -1;
					}
					return 0;
				})
				setStore({ filterRent: orderSalesByPrice });
			},
			filterSalesByPrice: (minPriceSlider, maxPriceSlider) => {
				const salesFiltered = getStore().ventas.filter(item => (
					item.price > minPriceSlider && item.price < maxPriceSlider && item
				))

				const orderSalesByPrice = salesFiltered.sort((a, b) => {
					if (a.price > b.price) {
						return 1;
					} else if (a.price < b.price) {
						return -1;
					}
					return 0;
				})
				setStore({ filterSales: orderSalesByPrice });
			},
			setNewPlan: async (planValue) => {
				try {
					await fetch(process.env.BACKEND_URL + "/api/set_new_plan", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem('token'),
						},
						body: JSON.stringify({
							planValue
						})
					});
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			getDetalles: async (id) => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/gethouse/' + id)
					setStore({ casa: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}
			},
			getFavoritos: async () => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/usuario/favorito',
						{
							headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
						})
					setStore({ "favoritos": data.data.results })

				} catch (error) {
					console.log(error.response);
					setStore({ "favoritos": error.response.data.msg })
					return false

				}

			},

			createFavoritos: async (id) => {
				try {
					let data = await axios.post(process.env.BACKEND_URL + '/api/favoritos/house', {

						"user_id": localStorage.getItem("user_id"),
						"house_id": id

					})
				} catch (error) {
					console.log(error.response);
					setStore({ "favoritos": error.response.data.msg })
					return false

				}

			},

			getPerfilProp: async (id) => {
				if (id) {
					localStorage.setItem("prop_id", getStore().casa.info_propietario?.user_id)
				}

				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/user/' + localStorage.getItem('prop_id'))
					setStore({ propietario: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}

			},
			getCasasProp: async (id) => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/user/houses/' + localStorage.getItem('prop_id'))
					setStore({ casaPropietario: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}

			},

			getMyPerfil: async (id) => {
				if (id) {
					localStorage.setItem("prop_id", getStore().casa.info_propietario?.user_id)
				}

				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/user/' + localStorage.getItem('user_id'))
					setStore({ propietario: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}

			},
			getMyCasas: async (id) => {
				try {
					let data = await axios.get(process.env.BACKEND_URL + '/api/user/houses/' + localStorage.getItem('user_id'))
					setStore({ casaPropietario: data.data.results });
				} catch (error) {
					console.log(error);
					return false
				}

			},
			deleteFavoritos: async (casa_id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + '/api/favoritos/house/' + casa_id, {
						method: "DELETE",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem('token')
						}
					});
					const data = await resp.json()
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			editPerfil: async ({ name, lastname, password, phoneNumber, description }) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/user', {
						method: "PUT",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem('token')
						},
						body: JSON.stringify({

							"name": name,
							"lastname": lastname,
							"phone_number": phoneNumber,
							"password": password,
							"description": description


						})
					})
					const data = await resp.json()

					return data;
				} catch (error) {
				}
			},
			deleteCuenta: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/user", {
						method: "DELETE",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem('token')
						}
					});
					const data = await resp.json()
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			editProfilePic: async (picture_url) => {
				const options = {
					body: JSON.stringify({picture_url}),
					headers: { Authorization: "Bearer " + localStorage.getItem('token') },
					method: "POST",
				}
				try {
						await fetch(process.env.BACKEND_URL + "/api/profile_picture", options)
					}
				catch (error) {
					console.log(error);
				}
			},
			pagoMercadoPago: async (price, description) => {
				try {
					const response = await axios.post(process.env.BACKEND_URL + "/api/preference", {
						price: price,
						description: description  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
					}, {
						headers: { Authorization: "Bearer " + localStorage.getItem('token') }
					});
					setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) {
					console.log(error);
				}
			},

			deletePost: async (casa_id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + '/api/post/' + casa_id, {
						method: "DELETE",
					});
					const data = await resp.json()
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	}
};


export default getState;
