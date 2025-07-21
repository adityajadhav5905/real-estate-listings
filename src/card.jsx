import React from 'react';

const Card = ({ title, description, image, price, toemail, onEnquireClick }) => {
  return (
    <div className='w-full h-full'>
      <a
        href="#"
        className="group block max-w-sm h-auto px-6 mx-5 my-10 py-10 bg-white border-2 border-gray-200 rounded-lg shadow-sm 
          transition-all duration-300 
          hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:border-gray-100
          group-hover:border-transparent group-hover:[border-image:linear-gradient(45deg,#BC13FE_27%,#E025BE_18%,#F0459A_41%,#FB697A_23%,#FF8E5F_71%)] group-hover:[border-image-slice:1]"
      >
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-300 
              group-hover:[background-image:linear-gradient(45deg,#BC13FE_27%,#E025BE_18%,#F0459A_41%,#FB697A_23%,#FF8E5F_71%)] 
              group-hover:bg-clip-text group-hover:text-transparent 
              group-hover:[-webkit-background-clip:text] 
              group-hover:[-webkit-text-fill-color:transparent]"
        >
          {title}
        </h5>
        {image ? (
          <img
            src={image}
            alt="PropLogo"
            className="flex items-center justify-center p-2 m-2 border-2 border-gray-700 transition ease-in-out delay-150 duration-300 hover:border-amber-400 rounded-b-md min-h-28"
          />
        ) : null}

        <p
          className="font-normal text-gray-700 dark:text-gray-400 transition-all duration-300 
             group-hover:[background-image:linear-gradient(45deg,#BC13FE_27%,#E025BE_18%,#F0459A_41%,#FB697A_23%,#FF8E5F_71%)] 
             group-hover:bg-clip-text group-hover:text-transparent 
             group-hover:[-webkit-background-clip:text] 
             group-hover:[-webkit-text-fill-color:transparent] text-wrap"
        >
          {description}
        </p>
        <p
          className=" price font-normal my-5 text-gray-200 text-2xl dark:text-gray-400 transition-all duration-300 
             group-hover:[background-image:linear-gradient(45deg,#BC13FE_27%,#E025BE_18%,#F0459A_41%,#FB697A_23%,#FF8E5F_71%)] 
             group-hover:bg-clip-text group-hover:text-transparent 
             group-hover:[-webkit-background-clip:text] 
             group-hover:[-webkit-text-fill-color:transparent] text-wrap"
        >
          {price}

        </p>

        <div className="btn flex items-center justify-center w-full h-auto p-5">
          <button
            className="flex items-center bg-gray-300 transition ease-in-out duration-300 hover:scale-110 hover:bg-amber-500 m-1 px-3.5 py-1 rounded-2xl cursor-pointer"
            onClick={() => onEnquireClick(toemail)} 
          >
            Enquire
          </button>

        </div>
      </a>
    </div>
  );
};

export default Card;

