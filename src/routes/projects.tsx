import Project, {
  Block,
  Date,
  Heading,
  List,
  ListItem,
  Paragraph,
  Reveal,
} from '../components/project';
import Grid from '../shared/grid/grid';

const Projects = () => (
  <Grid>
    <Project>
      <Reveal>
        <Date>March 2020 – present</Date>
        <Heading>NatWest — Mettle</Heading>
        <Paragraph>
          Mettle by NatWest is the free business account that helps small
          businesses start, run and grow. I’m a senior frontend developer and
          tech lead, specialising in mobile. Day to day, I work on the core
          React Native mobile banking app.
        </Paragraph>
        <List>
          <ListItem>React Native</ListItem>
          <ListItem>TypeScript</ListItem>
          <ListItem>GraphQL (Apollo Client and Server)</ListItem>
        </List>
        <Paragraph>You can find Mettle on:</Paragraph>
        <List>
          <ListItem>
            <a href="https://apps.apple.com/gb/app/mettle-business-account/id1411976870">
              App Store (iOS)
            </a>
          </ListItem>
          <ListItem>
            <a href="https://play.google.com/store/apps/details?id=uk.co.mettle.app">
              Google Play (Android)
            </a>
          </ListItem>
          <ListItem>
            <a href="https://mettle.co.uk">Web</a>
          </ListItem>
        </List>
        <Paragraph>Basis: Full time</Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>January 2019 – 1 year 1 month</Date>
        <Heading>HSBC — Financial Management Web App</Heading>
        <Paragraph>
          Lead developer at HSBC (based on-site, Blue Fin) building a greenfield
          financial management and reporting web application.
        </Paragraph>
        <Block>
          <strong>Responsibilities and highlights:</strong>
          <List>
            <ListItem>
              Architecture and development on the front-end as well as a
              server-side middle tier.
            </ListItem>
            <ListItem>
              Driving creation of GraphQL schema alongside backend developers.
            </ListItem>
            <ListItem>Fragment-based query co-location</ListItem>
            <ListItem>
              Type safety across every tier (via code generation)
            </ListItem>
          </List>
        </Block>
        <Block>
          <strong>Technologies used:</strong>
          <List>
            <ListItem>
              React / TypeScript / GraphQL (Apollo Client) / Styled Components
            </ListItem>
            <ListItem>
              Node.js / GraphQL Schema Stitching + Delegation (Apollo Server)
            </ListItem>
            <ListItem>
              Pivotal Cloud Foundry / Micro service architecture
            </ListItem>
            <ListItem>Storybook</ListItem>
            <ListItem>ag-Grid</ListItem>
            <ListItem>Victory Charts</ListItem>
          </List>
        </Block>
        <Paragraph>Basis: Contract</Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>June 2017 – 1 year 7 months</Date>
        <Heading>Tier 1 Investment Bank — Research Web Apps</Heading>
        <Paragraph>
          A lead role at a Tier 1 investment bank (based on-site, Fleet Street),
          working within the Investment Research division on their headline
          research site. Working closely with teams in Singapore and New York,
          delivering UI components to internal business users, facilitating the
          creation of data-heavy apps using React, Redux and ag-Grid.
        </Paragraph>
        <Paragraph>
          The creation of a domain specific language and development of a custom
          expression to AST parser was a highlight. Additional responsibilities
          included driving front-end strategy as well as providing mentorship
          and guidance to fellow developers.
        </Paragraph>
        <List>
          <ListItem>React / Redux / Styled Components</ListItem>
          <ListItem>Storybook</ListItem>
          <ListItem>Data-heavy apps</ListItem>
          <ListItem>ag-Grid</ListItem>
          <ListItem>AEM integration</ListItem>
        </List>
        <Paragraph>Basis: Contract</Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>August 2016 – 10 months</Date>
        <Heading>Commerzbank — FX Trading Mobile App</Heading>
        <Paragraph>
          Lead developer on a mobile FX trading app for Commerzbank using
          TypeScript, RxJS, Angular 4 and Redux. Additional responsibilities
          include working directly with clients to specify technical solutions;
          providing mentorship and guidance to fellow developers as necessary;
          development of cross-project in-house tooling.
        </Paragraph>
        <List>
          <ListItem>Angular 4 / TypeScript / RxJS / Redux</ListItem>
          <ListItem>Real-time data</ListItem>
          <ListItem>Web Sockets</ListItem>
          <ListItem>Apache Cordova</ListItem>
        </List>
        <Paragraph>
          Contract via <a href="http://www.fathomlondon.com">Fathom London</a>
        </Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>April 2016 – 5 months</Date>
        <Heading>Standard Chartered — Regtech CRM Tool</Heading>
        <Paragraph>
          Senior developer on a custom CRM tool for Standard Chartered.
        </Paragraph>
        <List>
          <ListItem>Angular.js 1.5</ListItem>
          <ListItem>Node</ListItem>
          <ListItem>Parse DB</ListItem>
        </List>
        <Paragraph>
          Contract via <a href="http://www.fathomlondon.com">Fathom London</a>
        </Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>March 2014 – 1 year 9 months</Date>
        <Heading>Responsive.TV — Video platform SaaS</Heading>
        <Paragraph>
          Technical Lead and creative technologist on ResponsiveTV. An
          innovative video publishing SaaS comprising an interactive video
          player (vanilla TypeScript) and publishing suite including an entirely
          custom Adobe Premiere-like video editor app (Angular.js and d3).
        </Paragraph>
        <Paragraph>
          A highlight was successfully pitching to{' '}
          <a href="https://www.adweek.com/digital/bloombergs-new-publishing-platform-tinder-video-164340/">
            Bloomberg Media
          </a>{' '}
          and writing US patent documentation.
        </Paragraph>
        <List>
          <ListItem>TypeScript (consumer front-end)</ListItem>
          <ListItem>Angular.js / d3 (custom CMS)</ListItem>
          <ListItem>Node / Express</ListItem>
          <ListItem>FFMPEG / MPEG-DASH</ListItem>
        </List>
        <Paragraph>
          Contract via <a href="https://www.stinkstudios.com">StinkStudios</a>
        </Paragraph>
      </Reveal>
    </Project>

    <Project>
      <Reveal>
        <Date>September 1999 – 14 years</Date>
        <Heading>Once upon a time...</Heading>

        <Paragraph>
          ...I previously worked in London and Dubai on award-winning projects
          for brands including <a href="https://vimeo.com/80782045">Google</a>,
          Pepsi, <a href="https://vimeo.com/47368678">Philips</a>,{' '}
          <a href="https://vimeo.com/68389271">Shell</a>, Ford,{' '}
          <a href="https://vimeo.com/34629119">SNCF</a>, Land Rover,{' '}
          <a href="https://vimeo.com/29561057">Hugo Boss</a> and even those
          cheeky insurance peddling{' '}
          <a href="https://vimeo.com/79675988">meerkats.</a>
        </Paragraph>

        <Paragraph>
          In 2012, I turned my love for karaoke into a{' '}
          <a href="https://vimeo.com/162169077">social gaming business</a>.
        </Paragraph>

        <Paragraph>
          In 2007,{' '}
          <a href="https://techcrunch.com/2007/08/25/saturday-morning-im-watching-tubecast/">
            TechCrunch mistakenly reported
          </a>{' '}
          that{' '}
          <a href="https://www.youtube.com/watch?v=yLUrkPeLUYQ">tubecast.tv</a>{' '}
          — a personal ‘bedroom-learning’ project of mine — was an actual
          start-up (?!).
        </Paragraph>

        <Paragraph>
          See <a href="https://www.linkedin.com/in/philipbulley/">LinkedIn</a>{' '}
          for detailed work and education history.
        </Paragraph>
      </Reveal>
    </Project>
  </Grid>
);

export default Projects;
