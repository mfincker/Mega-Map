<template>
  <div id="edit-form">
    <div id="close-button" @click="closeForm"><i class="fas fa-times"></i></div>
    <p v-if="show">
      Please update the information for this location in the form below. We really appreciate your help in maintaining these resources up to
      date.
    </p>
    <p v-else>We've received your edits. Thank you!</p>
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <!-- Location -->
      <b-form-group id="input-group-1" label="Location:" label-for="input-1">
        <!-- name -->
        <b-form-text>Resource name:</b-form-text>
        <b-form-input id="input-1-1" v-model="form.provider_name"></b-form-input>
        <!-- additional location details -->
        <template v-if="!!form.provider_addloc">
          <b-form-text>Additional name:</b-form-text>
          <b-form-input id="input-1-2" v-model="form.provider_addloc"></b-form-input>
        </template>
        <!-- address -->
        <template v-if="!!form.address">
          <b-form-text>Address:</b-form-text>
          <b-form-input id="input-1-3" v-model="form.address"></b-form-input>
          <b-form-input v-if="!!form.city" id="input-1-3" v-model="form.city"></b-form-input>
        </template>
      </b-form-group>
      <!-- Contact -->
      <b-form-group id="input-group-2" label="Contact:" label-for="input-2">
        <!-- phone number -->
        <template v-if="!!form.contact">
          <b-form-text>Phone number:</b-form-text>
          <b-form-input id="input-2-1" v-model="form.contact"></b-form-input>
        </template>
        <!-- website -->
        <template v-if="!!form.web_link">
          <b-form-text>Website:</b-form-text>
          <b-form-input id="input-2-1" v-model="form.web_link"></b-form-input>
        </template>
      </b-form-group>
      <!-- Opening hours -->
      <b-form-group id="input-group-3" label="Opening hours:" label-for="input-3">
        <div v-for="(d, index) in dayFilters" :key="index">
          <b-form-text>{{ $t(`dayofweek.${weekdayHours[index].day}`) }}:</b-form-text>
          <b-form-input v-model="form[d]"></b-form-input>
        </div>
      </b-form-group>
      <!-- Senior hours -->
      <b-form-group id="input-group-4" label="Senior hours:" label-for="input-4" v-if="form.senior">
        <div v-for="(d, index) in seniorDayFilters" :key="index">
          <b-form-text>{{ $t(`dayofweek.${weekdayHours[index].day}`) }}:</b-form-text>
          <b-form-input v-model="form[d]"></b-form-input>
        </div>
      </b-form-group>
      <!-- Additional information -->
      <b-form-group id="input-group-5" label="Additional information:" label-for="input-1">
        <b-form-text>Anything else that is missing, needs changing or should be displayed?</b-form-text>
        <b-form-textarea
          id="input-5"
          v-model="form.other"
          placeholder="New service, location permanently closed, senior shopping hours ..."
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-form-invalid-feedback v-if="submitted" :state="edited">Nothing has changed.</b-form-invalid-feedback>
    </b-form>
  </div>
</template>

<script>
import { dayFilters, weekdayHours, seniorDayFilters } from '@/constants'
export default {
  name: 'EditForm',
  props: {
    location: Object
  },
  data() {
    return {
      form: {},
      dayFilters: {},
      weekdayHours: {},
      seniorDayFilters: {},
      show: true,
      edited: false,
      submitted: false
    }
  },
  created() {
    console.log('get edit location from created')
    this.dayFilters = dayFilters
    this.weekdayHours = weekdayHours
    this.seniorDayFilters = seniorDayFilters
    // Prefill form with current values
    this.form = { ...this.location }
    this.formatHour()
    this.form.other = ''
  },
  methods: {
    formatHour() {
      dayFilters.forEach((d) => {
        this.form[d] = this.form[d] == '0' ? 'Closed' : this.form[d]
      })
      seniorDayFilters.forEach((d) => {
        this.form[d] = this.form[d] == '0' ? 'Closed' : this.form[d]
      })
    },
    closeForm() {
      this.form = {}
      this.$emit('closed-edit-form')
    },
    async postForm(arr) {
      const urlbase = 'https://docs.google.com/forms/d/e/1FAIpQLSeV-PdW2XC4XWt78TfdmE8xcJ2JXga1Xr5mRKe0D8JPbp_NTA/formResponse'

      const form_entries = [
        'entry.1303167683',
        'entry.88165322',
        'entry.877956914',
        'entry.605324063',
        'entry.412042501',
        'entry.2078745335',
        'entry.1603482356',
        'entry.1495612279',
        'entry.216349566',
        'entry.1000522544',
        'entry.2046646524',
        'entry.1270024710',
        'entry.295717420',
        'entry.1889172928',
        'entry.1995637968',
        'entry.1327042286',
        'entry.475737574',
        'entry.247372578',
        'entry.976125072',
        'entry.1761299050',
        'entry.2143387292',
        'entry.1640048744',
        'entry.456294914',
        'entry.1135130355',
        'entry.1603671834',
        'entry.1231907808',
        'entry.1996895285',
        'entry.2096169027',
        'entry.1581595588',
        'entry.896282023',
        'entry.1284470325',
        'entry.1091154180',
        'entry.156161214',
        'entry.1030028945',
        'entry.1675400185',
        'entry.573991945',
        'entry.6555295',
        'entry.250439081',
        'entry.1685005488',
        'entry.1086955615',
        'entry.2041034445',
        'entry.1988794704'
      ]

      const query = form_entries.reduce((u, e, i) => {
        return u + e + '=' + encodeURI(arr[i]) + '&'
      }, '?')
      // POST to google form
      try {
        await fetch(urlbase + query.slice(0, -1), {
          method: 'post',
          mode: 'no-cors'
        })
        setTimeout(this.closeForm, 1250)
      } catch (e) {
        alert('There was an error during the form submission. Please try again or contact us at baycommunityresource@gmail.com.')
      }
    },
    onSubmit(evt) {
      evt.preventDefault()
      const col = ['provider_name', 'provider_addloc', 'address', 'city', 'contact', 'web_link']
      const days = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat', 'sp_sun', 'sp_mon', 'sp_tues', 'sp_wed', 'sp_thr', 'sp_fri', 'sp_sat']
      let resp = [this.location['cartodb_id']]
      col.forEach((c) => {
        resp.push(this.location[c])
        if (this.location[c] == this.form[c]) {
          resp.push('')
        } else {
          this.edited = true
          resp.push(this.form[c])
        }
      })
      days.forEach((c) => {
        resp.push(this.location[c])
        if ((this.location[c] == '0' && this.form[c] == 'Closed') || this.location[c] == this.form[c]) {
          resp.push('')
        } else {
          this.edited = true
          resp.push(this.form[c])
        }
      })
      // Other
      resp.push(this.form['other'])
      if (this.form['other'] !== '') {
        this.edited = true
      }
      // Submit if something was edited
      console.log(this.edited)
      if (this.edited) {
        this.show = false
        this.postForm(resp)
      }
      this.submitted = true
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.form = { ...this.location }
      this.formatHour()
      this.form.other = ''
      this.submitted = false
      // // Trick to reset/clear native browser form validation state
      // this.show = false
      // this.$nextTick(() => {
      //   this.show = true
      // })
    }
  }
}
</script>

<style type="text/css">
#edit-form {
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  background-color: white;
  z-index: 999999;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.125);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.125);
  overflow-y: scroll;
  padding: 56px;
}

@media (min-width: 650px) {
  #edit-form {
    width: 80%;
    left: 10%;
  }
}

#close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
