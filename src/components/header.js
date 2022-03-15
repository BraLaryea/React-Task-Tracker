import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
    const onClick = () => {
        console.log('something')
    }
    return (
        // <header style={{ color: 'red' }}>
        <header className='header'>
            {/* <h1 style={headingStyle}> */}
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// const headingStyle = {
//     backgroundColor: 'black'
// }

export default Header