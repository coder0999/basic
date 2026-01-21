import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center p-3 rounded-lg md:justify-center ${
      isActive ? 'text-blue-600' : 'text-gray-500'
    }`;

  const navClasses = `fixed bottom-0 left-0 w-full bg-white shadow-2xl z-10 
    md:fixed md:right-0 md:top-[4rem] md:h-[calc(100vh-4rem)] md:shadow-lg md:rounded-l-lg
    md:flex md:flex-col md:p-4 transition-all duration-500 smooth-transition 
    ${'md:w-20'}`;

  return (
    <nav className={navClasses}>
      <div className="flex justify-around items-center h-16 md:h-auto md:flex-col md:items-stretch md:space-y-6">
        <NavLink to="/" className={navLinkClass}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9H21M9 15L11 17L15 13M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className={'text-xs mt-1'}>الامتحانات</span>
        </NavLink>
        <NavLink to="/evaluations" className={navLinkClass}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 294.023 294.023"><path d="M124.916,0.002 c-1.649,0.045-3.169,0.9-4.064,2.285l-14.49,21.736h-49.35c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5 V39.574l-10,15v19.449h-40v-40h37.682L85.631,55.117l-6.146-12.293c-1.205-2.485-4.196-3.523-6.681-2.318 c-2.485,1.205-3.523,4.196-2.318,6.681c0.018,0.036,0.035,0.072,0.054,0.108l10,20c1.235,2.47,4.238,3.472,6.709,2.237 c0.778-0.389,1.441-0.974,1.924-1.698l40-60c1.565-2.276,0.989-5.389-1.287-6.954C127.013,0.281,125.974-0.027,124.916,0.002 L124.916,0.002z M147.012,44.025c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5 H147.012z M57.012,94.06c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5v-50c0-2.761-2.239-5-5-5H57.012z M62.012,104.06h40v40h-40V104.06z M147.012,114.023c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10 c0-2.761-2.239-5-5-5H147.012z M57.012,164.023c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5v-50 c0-2.761-2.239-5-5-5H57.012z M62.012,174.023h40v40h-40V174.023z M147.012,184.058c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90 c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z M57.012,234.023c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50 c2.761,0,5-2.239,5-5v-50c0-2.761-2.239-5-5-5L57.012,234.023L57.012,234.023z M62.012,244.023h40v40h-40V244.023z M147.012,254.023 c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z"></path></svg>
            <span className={'text-xs mt-1'}>التقييمات</span>
        </NavLink>
        <NavLink to="/store" className={navLinkClass}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 1 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={'text-xs mt-1'}>المتجر</span>
        </NavLink>
        <NavLink to="/profile" className={navLinkClass}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={'text-xs mt-1'}>البروفايل</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;