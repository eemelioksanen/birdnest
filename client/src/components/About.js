import '../styles/About.css'

const About = () => (
  <div className='About'>
    <h1>About this app</h1>
    This app tracks the locations of drones visible to the monitoring equipment.
    If a drone is detected to violate the NDZ perimeter, information regarding
    the pilot will be listed in the form below. Data about each violator will be
    stored for 10 minutes after the last detection of the drone. The
    visualization on the left displays all the drones (grey dots) flying around
    the 500x500-meter square. The blue circle represents the 100-meter radius
    around the bird nest (red dot).
    <br />
    This application was developed by Eemeli Oksanen for the Reaktor summer 2023
    trainee application pre-assignment.
  </div>
)

export default About
