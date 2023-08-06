Import EAC-CPF
==============

Le tableau ci-dessous référence les balises XML du format `EAC-CPF`_ prises en
compte ou non par le SAEM au moment de l'import. Les points ``.`` indiquent
que la balise est prise en compte (pour certaines partiellement). Les ``X``
indiquent que la balise n'est pas prise en compte, les ``-`` qu'elle ne l'est
que partiellement.

.. _`EAC-CPF`: http://eac.staatsbibliothek-berlin.de/fileadmin/user_upload/schema/cpfTagLibrary.html

::

    |     |     EAC-CPF Elements     |
    |=====|==========================|
    |  X  |       abbreviation       |
    |  X  |         abstract         |
    |  .  |         address          |
    |  .  |       addressLine        |
    |  X  |        agencyCode        |
    |  X  |        agencyName        |
    |  .  |          agent           |
    |  .  |        agentType         |
    |  X  |     alternativeForm      |
    |  X  |      alternativeSet      |
    |  .  |      authorizedForm      |
    |  .  |         biogHist         |
    |  X  |        chronItem         |
    |  X  |        chronList         |
    |  .  |         citation         |
    |  X  |      componentEntry      |
    |  .  |         control          |
    |  X  |  conventionDeclaration   |
    |  .  |      cpfDescription      |
    |  .  |       cpfRelation        |
    |  .  |           date           |
    |  .  |        dateRange         |
    |  X  |         dateSet          |
    |  .  |       description        |
    |  .  |     descriptiveNote      |
    |  .  |         eac-cpf          |
    |  .  |         entityId         |
    |  .  |        entityType        |
    |  X  |          event           |
    |  .  |      eventDateTime       |
    |  .  |     eventDescription     |
    |  .  |        eventType         |
    |  .  |        existDates        |
    |  .  |         fromDate         |
    |  .  |         function         |
    |  X  |     functionRelation     |
    |  .  |        functions         |
    |  .  |      generalContext      |
    |  .  |         identity         |
    |  X  |           item           |
    |  X  |         language         |
    |  X  |   languageDeclaration    |
    |  X  |      languagesUsed       |
    |  X  |       languageUsed       |
    |  .  |       legalStatus        |
    |  .  |      legalStatuses       |
    |  X  |          level           |
    |  X  |           list           |
    |  X  |       localControl       |
    |  X  |     localDescription     |
    |  X  |    localDescriptions     |
    |  X  |   localTypeDeclaration   |
    |  X  |    maintenanceAgency     |
    |  .  |     maintenanceEvent     |
    |  .  |    maintenanceHistory    |
    |  X  |    maintenanceStatus     |
    |  .  |         mandate          |
    |  .  |         mandates         |
    |  X  |    multipleIdentities    |
    |  .  |        nameEntry         |
    |  X  |    nameEntryParallel     |
    |  X  |      objectBinWrap       |
    |  .  |      objectXMLWrap       |
    |  .  |        occupation        |
    |  .  |       occupations        |
    |  X  |     otherAgencyCode      |
    |  X  |      otherRecordId       |
    |  X  |         outline          |
    |  .  |            p             |
    |  X  |           part           |
    |  .  |          place           |
    |  .  |        placeEntry        |
    |  .  |        placeRole         |
    |  .  |          places          |
    |  X  |      preferredForm       |
    |  X  |    publicationStatus     |
    |  .  |         recordId         |
    |  .  |      relationEntry       |
    |  .  |        relations         |
    |  .  |     resourceRelation     |
    |  X  |          script          |
    |  X  |       setComponent       |
    |  .  |          source          |
    |  .  |       sourceEntry        |
    |  .  |         sources          |
    |  .  |           span           |
    |  .  |   structureOrGenealogy   |
    |  .  |           term           |
    |  .  |          toDate          |
    |  X  |         useDates         |


    |     |     EAC-CPF Attributes   |
    |=====|==========================|
    |  X  |  @accuracy               |
    |  X  |  @altitude               |
    |  X  |  @countryCode            |
    |  .  |  @cpfRelationType        |
    |  X  |  @functionRelationType   |
    |  X  |  @identityType           |
    |  X  |  @languageCode           |
    |  X  |  @lastDateTimeVerified   |
    |  X  |  @latitude               |
    |  -  |  @localType              |
    |  X  |  @longitude              |
    |  X  |  @notAfter               |
    |  X  |  @notBefore              |
    |  .  |  @resourceRelationType   |
    |  X  |  @scriptCode             |
    |  .  |  @standardDate           |
    |  .  |  @standardDateTime       |
    |  X  |  @style                  |
    |  X  |  @transliteration        |
    |  .  |  @vocabularySource       |
    |  X  |  @xlink:actuate          |
    |  X  |  @xlink:arcrole          |
    |  -  |  @xlink:href             |
    |  -  |  @xlink:role             |
    |  X  |  @xlink:show             |
    |  X  |  @xlink:title            |
    |  X  |  @xlink:type             |
    |  X  |  @xml:base               |
    |  X  |  @xml:id                 |
    |  X  |  @xml:lang               |
