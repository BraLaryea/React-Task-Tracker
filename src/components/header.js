import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, showForm, showAdd }) => {
    const Location = useLocation()
    return (
        // <header style={{ color: 'red' }}>
        <header className='header'>
            {/* <h1 style={headingStyle}> */}
            <h1>{title}</h1>
            {Location.pathname === '/' && < Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={showForm} />}
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