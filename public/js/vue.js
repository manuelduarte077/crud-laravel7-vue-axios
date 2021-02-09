
var app = new Vue({
    el: "#app",
    data: {
        datos: [],
        message: ''
    },

    methods: {
        getDatos() {
            let url = '/api/datosp';
            axios.get(url).then(response=>{
                console.log(response.data);
                this.datos = response.data;
            });
        },

        nuevoDato() {
          console.log('Nuevo Dato');

          Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([

            {
              title: 'Digite su nombre',
              text:  'Nombre y Apellido',
              input: 'text',
              inputValidator: (value) => {
                if (!value) {
                  toastr.error('Debe ingresar un nombre', 'error');
                  return ' '
                }
              }
            },
            {
              title: 'Selecciona su posición',
              text:  'Posicíon del empleado',
              input: 'select',
                inputOptions: {
                    Auditor: 'Auditor',
                    Soporte: 'Soporte',
                    Seguridad: 'Seguridad',            
                },
                inputPlaceholder: 'Selecciona una posición',
                inputValidator: (value) => {
                  if (!value) {
                    toastr.error('Debe seleccionar uno', 'error');
                    return ' '
                  }
                }
            },

            {
              title: 'Ingrese el salario',
              text:  'Este campo acepta decimales',
              input: 'number',
              inputAttributes: {
                min: 4,
                step: 0.01
              },
              inputValidator: (value) => {
                if (!value) {
                  toastr.error('Debe ingresar el salario', 'error');
                  return ' '
                }
              }
            },

          ]).then( async (result) => {
            if (result.value) {

              datos = {
                name     : result.value[0],
                position : result.value[1],
                salary   : result.value[2], 

              }

              //console.log(datos);

              let url = '/api/datosp';
              await axios.post(url, datos).then(response=>{
                  console.log(response.data);
                  this.mensaje = response.data;
              });

              this.getDatos();
                toastr.success(this.mensaje);
            }
          })

        },

    },

    mounted() {
        this.getDatos();
    }

})
