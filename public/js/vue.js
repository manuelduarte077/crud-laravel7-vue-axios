
var app = new Vue({
    el: "#app",
    data: {
        datos: [],
        message: ""
    },

    methods: {
        getDatos() {
            let url = '/api/datosp';
            axios.get(url).then(reponse=>{
                console.log(reponse.data);
                this.datos = reponse.data;
            });
        }
    },

    mounted() {
        this.getDatos();
    }
});
