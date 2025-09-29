import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function BootstrapLists() {
  return (
    <>
      {/* LIST 1 */}
      <div id="wd-css-styling-lists">
        <h2>Favorite movies</h2>
        <ListGroup>
          <ListGroupItem active>My Neighbor Totoro</ListGroupItem>
          <ListGroupItem>Spirited Away</ListGroupItem>
          <ListGroupItem>Kiki's Delivery Service </ListGroupItem>
          <ListGroupItem>Howl's Moving Castle </ListGroupItem>
          <ListGroupItem disabled> Princess Mononoke  </ListGroupItem>
        </ListGroup>
      </div>
      
      {/* LIST 2: Favorite Books*/}
      <div id="wd-css-hyperlink-list" className="mt-4">
        <h3>Favorite books</h3>
        <ListGroup>
          <ListGroupItem action active href="https://en.wikipedia.org/wiki/My_Neighbor_Totoro">
              Totoro
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba">
              Demon Slayer: Kimetsu no Yaiba
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/The_Little_Prince">
              The Little Prince
          </ListGroupItem>
          <ListGroupItem action href="https://en.wikipedia.org/wiki/Harry_Potter">
              Harry Potter series
          </ListGroupItem>
          <ListGroupItem action disabled href="https://en.wikipedia.org/wiki/Your_Name">
              Your Name
          </ListGroupItem>
        </ListGroup>
      </div>
    </>
  );
}