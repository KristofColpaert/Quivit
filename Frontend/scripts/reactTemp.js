/**
 * Created by martijn on 16/11/15.
 */

const Navigation = React.createClass({
    render: function() {
        return (
            <header className="header">
                <nav className="navigation">
                    <h1>Quivit</h1>

                    <ul className="list">
                        <li className="menu item">live</li>
                        <li className="menu item">about</li>
                    </ul>
                </nav>
            </header>
        );
    }
});

const Main = React.createClass({
   render: function() {
       return (
           <main>
               <Navigation />
               {/* Tijdelijk ;-) */}
               <br/>
               <br/>

               {/* TODO: Omzetten naar custom tags */}
               <section className="games">
                   <h2>Live Games</h2>
               </section>

           </main>
       );
   }
});

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);