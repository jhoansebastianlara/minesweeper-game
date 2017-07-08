import Vue from 'vue'
import VueResource from 'vue-resource'
import { config } from '@/config'

Vue.use(VueResource)

Vue.http.options.root = config.api.root
// Vue.http.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkZDJmYzExNzA0Nzk1ZGFhNmY1NDUwYzkwZmQyNTE2ZTI4MTM5NWU0NmE2M2QwMWNlYjQ3MjAxMjBhMGUxMGQzOTU2NDdjOWI1YThhYjQ5In0.eyJhdWQiOiIxIiwianRpIjoiM2RkMmZjMTE3MDQ3OTVkYWE2ZjU0NTBjOTBmZDI1MTZlMjgxMzk1ZTQ2YTYzZDAxY2ViNDcyMDEyMGEwZTEwZDM5NTY0N2M5YjVhOGFiNDkiLCJpYXQiOjE0OTk1MjkxNjcsIm5iZiI6MTQ5OTUyOTE2NywiZXhwIjoxNTMxMDY1MTY3LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.vma646u_ebbpKTcFj2Sf_hehp3SCO-tvN2R3SlH4LQg8-VqOqXVyEALnLpRaWGZSMUkNzVFoFsXmu0yIrg265pd3ixsLU_foEL1m5JF7JQyRYCU0sWgA8DzgM1l_obeoNwGRlz_iAu1WKYQZebz5oeGD_L9LGuEiuZhuPP_JlqELqMvE2RJxwmuVzUmB0yNajDP1nAPLWCzWJtqWkzOhWHToCcPL7CPZp5IR-rjg_-1SwfBcCLVwDeIfZ4Gutr8Xf7Z6iDbynFMndaby6YcO764qeOfrlWSOPqBo8nUoxG9SWkXe4L6itzdUooYIfkJXXtaZoFQ8P6YopKk2arxknPSD1NTphGnhgMYhLO8VtTD9U4fLWj_NzZGm02eNliRGPrDF8Fd28jKgxAfLGAoroDuXlRVPiupp09j8oxHCD8xZTduwA1FQPhCEdaktaT3bosBgjMhK4M1q5EoEcQKTc9YBxIDBp9OnzeKg9aC8fR59thJJEhVvVEaXkme9CtWyqqQIgPoV4b6vnlF2R2-VIKQM4erJtCOc3fXfv7Kq8hAAxUbMs2Qpo-sjWXu-fJyXudEQQr90ZW5WyOHB-xs5WNiiyhqZ_o43oFOcixdnsksNGWrti1RX6Hu6J79HtreLzlYJMZ8fslm9MZZ_ZKnQoIueAgeL6BuJmLsVwWFwT_s'