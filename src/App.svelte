<script lang="ts">
  import {
    CardGroup,
    Container,
    Card,
    Form,
    FormGroup,
    Input,
    Styles,
    InputGroup,
    InputGroupText,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Col,
  } from "sveltestrap";
  import Katex from "./Katex.svelte";
  import { initialInterval, maxRetries, exponentialFactor } from "./store";
</script>

<Styles />

<main>
  <h1>Exponential Backoff Calculator</h1>
  <p>
    This is a simple calculator inspired by <a
      href="https://exponentialbackoffcalculator.com/"
      >exponentialbackoffcalculator.com</a
    >. It is written in <a href="https://svelte.dev/">Svelte</a>. Svelte is an
    amazing framework for writing quick and easy web applications. It is truly
    reactive. Be sure to go check it out for yourself.
  </p>
  <Container sm>
    <CardGroup>
      <Card class="shadow-lg mb-5 rounded">
        <CardHeader />
        <CardBody>
          <Form>
            <FormGroup>
              <InputGroup>
                <InputGroupText>Initial Interval (seconds)</InputGroupText>
                <Input type="number" bind:value={$initialInterval} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupText>Max Retries</InputGroupText>
                <Input type="number" bind:value={$maxRetries} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupText>Exponential Factor</InputGroupText>
                <Input type="number" bind:value={$exponentialFactor} />
              </InputGroup>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter />
      </Card>
    </CardGroup>
  </Container>

  <p>
    This tool helps visualize an exponential retry strategy based on a number of
    parameters (interval (seconds), max retries, exponential rate). The equation
    below calculates the time (in seconds) from the first call.
  </p>
  <h3>
    <Katex
      math={"T() = initialInterval * exponentialFactor^{retryCount}"}
      displayMode
    />
  </h3>
  <Container sm>
    <Row>
      <Col>
        <h4>Run Number</h4>
      </Col>
      <Col>
        <h4>Elapsed Time in Seconds</h4>
      </Col>
      <Col>
        <h4>Equation</h4>
      </Col>
    </Row>
    {#each Array($maxRetries) as _blank, try_count}
      <Row>
        <Col>{try_count}</Col>
        <Col
          >{(
            $initialInterval * Math.pow($exponentialFactor, try_count)
          ).toLocaleString()}</Col
        >
        <Col>
          <Katex
            math={(
              $initialInterval * Math.pow($exponentialFactor, try_count)
            ).toLocaleString() +
              " = " +
              $initialInterval +
              " * " +
              $exponentialFactor +
              "^{" +
              try_count +
              "}"}
            displayMode
          />
        </Col>
      </Row>
    {/each}
  </Container>

  <h2>Technologies</h2>
  <Row>
    <Col>
      <a href="https://svelte.dev/">Svelte</a>
    </Col>
  </Row>
  <Row>
    <Col>
      <a href="https://katex.org/"><Katex math={"KATEX.org"} /></a>
    </Col>
  </Row>
  <Row>
    <Col>
      Inspired by <a href="https://exponentialbackoffcalculator.com/"
        >exponentialbackoffcalculator.com</a
      >
    </Col>
  </Row>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
